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
} from 'react-relay';

import type {Todo_todo} from './__generated__/Todo_todo.graphql';
import type {Todo_user} from './__generated__/Todo_user.graphql';
import type {
  ChangeTodoStatusInput,
  ChangeTodoStatusMutationResponse,
} from './__generated__/ChangeTodoStatusMutation.graphql';

export default graphql`
  mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;

export function changeTodoStatusOptimisticResponse(
  complete: boolean,
  todo: Todo_todo,
  user: Todo_user,
): ChangeTodoStatusMutationResponse {
  return {
    changeTodoStatus: {
      todo: {
        complete: complete,
        id: todo.id,
      },
      user: {
        id: user.id,
        completedCount: complete
          ? user.completedCount + 1
          : user.completedCount - 1,
      },
    },
  };
}
