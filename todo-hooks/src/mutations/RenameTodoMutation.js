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

import type { Todo_todo } from './__generated__/Todo_todo.graphql';

import type {
  RenameTodoInput,
  RenameTodoMutationResponse,
} from './__generated__/RenameTodoMutation.graphql';

export default graphql`
  mutation RenameTodoMutation($input: RenameTodoInput!) {
    renameTodo(input: $input) {
      todo {
        id
        text
      }
    }
  }
`;

export function renameTodoOptimisticResponse(
  todo: Todo_todo,
  text: string,
): RenameTodoMutationResponse {
  return {
    renameTodo: {
      todo: {
        id: todo.id,
        text: text,
      },
    },
  };
}
