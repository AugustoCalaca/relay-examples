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

import Todo from './Todo';
import MarkAllTodosMutation, { markAllTodosOptimisticResponse } from '../mutations/MarkAllTodosMutation';
import useMutation from '../mutations/useMutation';

import React, { useCallback } from 'react';
import { useFragment, graphql } from 'react-relay/hooks';
import type { TodoList_user } from './__generated__/TodoList_user.graphql';
import type { TodoApp_user } from './__generated__/TodoApp_user.graphql';

type Todos = $NonMaybeType<$ElementType<TodoList_user, 'todos'>>;
type Edges = $NonMaybeType<$ElementType<Todos, 'edges'>>;
type Edge = $NonMaybeType<$ElementType<Edges, number>>;
type Node = $NonMaybeType<$ElementType<Edge, 'node'>>;

type Props = {|
  +user: TodoList_user,
|};

const TodoList = (props: Props) => {
  const data = useFragment<TodoList_user>(
    graphql`
      fragment TodoList_user on User {
        todos(
          first: 2147483647 # max GraphQLInt
        ) @stream_connection(key: "TodoList_todos", initial_count: 0) {
          edges {
            node {
              id
              complete
              ...Todo_todo
            }
          }
        }
        id
        userId
        totalCount
        completedCount
        ...Todo_user
      }
    `,
    props.user,
  );
  
  const { todos, totalCount, completedCount, userId } = data;

  const [_, markallTodos] = useMutation(MarkAllTodosMutation);

  const handleMarkAllChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      const complete = event.currentTarget.checked;

      if (todos) {
        markallTodos({
          variables: {
            input: {
              complete, 
              userId
            }
          },
          optimisticResponse: markAllTodosOptimisticResponse(complete, todos, data)
        })
      }
    },
    [markallTodos]
  );

  const nodes: $ReadOnlyArray<Node> =
    todos && todos.edges
      ? todos.edges
          .filter(Boolean)
          .map((edge: Edge) => edge.node)
          .filter(Boolean)
      : [];

  return (
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {nodes.map((node: Node) => (
          <Todo key={node.id} todo={node} user={data} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;