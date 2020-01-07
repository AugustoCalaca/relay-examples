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

import {
  graphql,
  type RecordSourceSelectorProxy,
} from 'react-relay';

import { ConnectionHandler } from 'relay-runtime';
import type { RemoveCompletedTodosInput } from './__generated__/RemoveCompletedTodosMutation.graphql';

import type {TodoListFooter_user} from 'relay/TodoListFooter_user.graphql';
type Todos = $NonMaybeType<$ElementType<TodoListFooter_user, 'todos'>>;
type Edges = $NonMaybeType<$ElementType<Todos, 'edges'>>;
type Edge = $NonMaybeType<$ElementType<Edges, number>>;
type Node = $NonMaybeType<$ElementType<Edge, 'node'>>;

export default graphql`
  mutation RemoveCompletedTodosMutation($input: RemoveCompletedTodosInput!) {
    removeCompletedTodos(input: $input) {
      deletedTodoIds
      user {
        completedCount
        totalCount
      }
    }
  }
`;

export function removeCompletedTodoSharedUpdater(
  store: RecordSourceSelectorProxy,
  user: TodoListFooter_user,
  deletedIDs: $ReadOnlyArray<string>,
) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');

  // Purposefully type forEach as void, to toss the result of deleteNode
  deletedIDs.forEach((deletedID: string): void =>
    ConnectionHandler.deleteNode(conn, deletedID),
  );
}
