// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import RemoveCompletedTodosMutation, { removeCompletedTodoSharedUpdater } from '../mutations/RemoveCompletedTodosMutation';
import useMutation from '../mutations/useMutation';

import React, { useCallback } from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import type { RecordSourceSelectorProxy } from 'relay-runtime';
import type { TodoListFooter_user } from './__generated__/TodoListFooter_user.graphql';

type Todos = $NonMaybeType<$ElementType<TodoListFooter_user, 'todos'>>;
type Edges = $NonMaybeType<$ElementType<Todos, 'edges'>>;
type Edge = $NonMaybeType<$ElementType<Edges, number>>;

type Props = {|
  +user: TodoListFooter_user,
|};

const TodoListFooter = (props: Props) => {
  const data = useFragment<TodoListFooter_user>(
    graphql`
      fragment TodoListFooter_user on User {
        id
        userId
        completedCount
        todos(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "TodoList_todos") {
          edges {
            node {
            id
              complete
            }
          }
        }
        totalCount
      }
    `,
    props.user,
  );
  
  const [_, removeCompletedTodo] = useMutation(RemoveCompletedTodosMutation);

  const completedEdges: $ReadOnlyArray<?Edge> =
    data.todos && data.todos.edges
      ? data.todos.edges.filter(
          (edge: ?Edge) => edge && edge.node && edge.node.complete,
        )
      : [];

  const handleRemoveCompletedTodosClick = useCallback(
    () => {
      removeCompletedTodo({
        variables: {
          input: {
            userId: data.userId
          }
        },
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField('removeCompletedTodos');
          const deletedIds = payload.getValue('deletedTodoIds');
    
          removeCompletedTodoSharedUpdater(store, data, deletedIds);
        },
        optimisticUpdater: (store: RecordSourceSelectorProxy) => {
          const completedNodeIds: $ReadOnlyArray<string> = completedEdges.edges
            ? completedEdges.edges
                .filter(Boolean)
                .map((edge: Edge): ?Node => edge.node)
                .filter(Boolean)
                .filter((node: Node): boolean => node.complete)
                .map((node: Node): string => node.id)
            : [];
    
            removeCompletedTodoSharedUpdater(store, data, completedNodeIds);
        },
      })
    },
    [removeCompletedTodo]
  );

  const numRemainingTodos = data.totalCount - data.completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? '' : 's'} left
      </span>

      {data.completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedTodosClick}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoListFooter;
