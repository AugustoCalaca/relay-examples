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

import ChangeTodoStatusMutation, { changeTodoStatusOptimisticResponse } from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation, { removeTodoSharedUpdater } from '../mutations/RemoveTodoMutation';
import RenameTodoMutation, { renameTodoOptimisticResponse } from '../mutations/RenameTodoMutation';
import TodoSlowField from './TodoSlowField';

import useMutation from '../mutations/useMutation';
import TodoTextInput from './TodoTextInput';

import React, { useState, useCallback } from 'react';
import { useFragment, graphql } from 'react-relay/hooks';

import classnames from 'classnames';
import type { RecordSourceSelectorProxy } from 'relay-runtime';
import type { Todo_todo } from './__generated__/Todo_todo.graphql';
import type { Todo_user } from './__generated__/Todo_user.graphql';

type Props = {|
  +todo: Todo_todo,
  +user: Todo_user,
|};

const Todo = (props: Props) => {
  const todo = useFragment<Todo_todo>(
    graphql`
      fragment Todo_todo on Todo {
        ...TodoSlowField @defer
        complete
        id
        text
      }
    `,
    props.todo,
  );

  const user = useFragment<Todo_user>(
    graphql`
      fragment Todo_user on User {
        id
        userId
        totalCount
        completedCount
      }
    `,
    props.user,
  );
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const [ , changeTodoStatus] = useMutation(ChangeTodoStatusMutation);
  const [ , removeTodo] = useMutation(RemoveTodoMutation);
  const [ , renameTodo] = useMutation(RenameTodoMutation);

  const handleCompleteChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      const complete = event.currentTarget.checked;

      changeTodoStatus({
        variables: {
          input: {
            complete, 
            userId: user.userId,
            id: todo.id,
          }
        },
        optimisticResponse: changeTodoStatusOptimisticResponse(complete, todo, user)
      });
    },
    [changeTodoStatus],
  );

  const handleDestroyClick = () => handleRemoveTodo();
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    handleRemoveTodo();
  };

  const handleTextInputSave = useCallback( 
    (text: string) => {
      setIsEditing(false);

      renameTodo({
        variables: {
          input: {
            id: todo.id,
            text,
          }
        },
        optimisticResponse: renameTodoOptimisticResponse(todo, text),
      })
    },
    [renameTodo, isEditing, setIsEditing],
  );

  const handleRemoveTodo = () => {
    removeTodo({
      variables: {
        input: {
          id: todo.id,
          userId: user.userId,
        }
      },
      updater: (store: RecordSourceSelectorProxy) => {
        const payload = store.getRootField('removeTodo');
        const deletedTodoId = payload.getValue('deletedTodoId');

        if (typeof deletedTodoId !== 'string') {
          throw new Error(
            `Expected removeTodo.deletedTodoId to be string, but got: ${typeof deletedTodoId}`,
          );
        }

        removeTodoSharedUpdater(store, user, deletedTodoId);
      },
      optimisticUpdater: (store: RecordSourceSelectorProxy) => {
        removeTodoSharedUpdater(store, user, todo.id);
      }
    })
  };

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />
        <label onDoubleClick={handleLabelDoubleClick}>
          {todo.text}
          <React.Suspense fallback={<div>loading slow field...</div>}>
            <TodoSlowField todo={todo} />
          </React.Suspense>
        </label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
};

export default Todo;
