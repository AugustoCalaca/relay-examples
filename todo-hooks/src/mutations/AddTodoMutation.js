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
  type RecordProxy,
  type RecordSourceSelectorProxy,
} from 'react-relay';

import { ConnectionHandler } from 'relay-runtime';
import type { TodoApp_user } from '../components/__generated__/TodoApp_user.graphql'
import type { AddTodoInput } from './__generated__/AddTodoMutation.graphql';

export default graphql`
  mutation AddTodoMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge {
        __typename
        cursor
        node {
          complete
          id
          text
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;

export function addTodoSharedUpdater(
  store: RecordSourceSelectorProxy,
  user: TodoApp_user,
  newEdge: RecordProxy,
) {
  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
  ConnectionHandler.insertEdgeAfter(connection, newEdge);
}
