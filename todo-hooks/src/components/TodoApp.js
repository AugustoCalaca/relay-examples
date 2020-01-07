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

import TodoList from './TodoList';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';
import AddTodoMutation, { addTodoSharedUpdater } from '../mutations/AddTodoMutation';
import useMutation from '../mutations/useMutation';

import React, { useCallback } from 'react';
import { useFragment, graphql } from 'react-relay/hooks';
import type { RecordSourceSelectorProxy } from 'relay-runtime';

import type { TodoApp_user } from './__generated__/TodoApp_user.graphql';

type Props = {|
  +user: TodoApp_user,
|};

const TodoApp = (props: Props) => {
  const data = useFragment<TodoApp_user>(
    graphql`
      fragment TodoApp_user on User {
        id
        userId
        totalCount
        ...TodoListFooter_user
        ...TodoList_user
      }
    `,
    props.user,
  );
  
  const [_, addTodo] = useMutation(AddTodoMutation);
  
  const handleTextInputSave = useCallback(
    (text: string) => {
      console.log('text input: ', text);
      console.log('userID input: ', data.userId);
      addTodo({
        variables: {
          input: {
            text,
            userId: data.userId,
          }
        },
        updater: (store: RecordSourceSelectorProxy) => {
          const payload = store.getRootField('addTodo');
          const newEdge = payload.getLinkedRecord('todoEdge');
          console.log('new edge', newEdge);

          addTodoSharedUpdater(store, data, newEdge);
        }
      })
    },
    [addTodo],
  );

  console.log('total count: ', data.totalCount);
  const hasTodos = data.totalCount > 0;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>

          <TodoTextInput
            className="new-todo"
            onSave={handleTextInputSave}
            placeholder="What needs to be done?"
          />
        </header>

        <TodoList user={data} />
        {hasTodos && <TodoListFooter user={data} />}
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by the{' '}
          <a href="https://facebook.github.io/relay/">Relay team</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};

export default TodoApp;
