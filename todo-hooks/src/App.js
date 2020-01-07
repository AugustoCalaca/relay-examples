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

import 'todomvc-common';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { RelayEnvironmentProvider, useLazyLoadQuery, graphql } from 'react-relay/hooks';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  type RequestNode,
  type Variables,
} from 'relay-runtime';

import TodoApp from './components/TodoApp';
import type {AppQueryResponse, AppQuery} from './__generated__/AppQuery.graphql';

async function fetchQuery(
  operation: RequestNode,
  variables: Variables,
): Promise<{}> {

  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const rootElement = document.getElementById('root');
console.log('root');

const App = () => {
  const data = useLazyLoadQuery<AppQuery>(
    graphql`
      query AppQuery($userId: String) {
        user(id: $userId) {
          ...TodoApp_user
        }
      }
    `,
    { userId: 'me' },
    { fetchPolicy: 'store-or-network' }
  );

  return <TodoApp user={data.user} />
};


ReactDOM.createRoot(rootElement).render(
  <RelayEnvironmentProvider environment={modernEnvironment}>
    <Suspense fallback={<div>loading app...</div>}>
      <App />
    </Suspense>
  </RelayEnvironmentProvider>
);
