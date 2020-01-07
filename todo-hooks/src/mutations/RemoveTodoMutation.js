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
import type { Todo_user } from './__generated__/Todo_user.graphql';
import type { Todo_todo } from './__generated__/Todo_todo.graphql';
import type { RemoveTodoInput } from './__generated__/RemoveTodoMutation.graphql';

export default graphql`
  mutation RemoveTodoMutation($input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      deletedTodoId
      user {
        completedCount
        totalCount
      }
    }
  }
`;

export function removeTodoSharedUpdater(
  store: RecordSourceSelectorProxy,
  user: Todo_user,
  deletedID: string,
) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
  ConnectionHandler.deleteNode(conn, deletedID);
}
