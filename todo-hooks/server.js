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

import express from 'express';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { schema } from './data/schema';

const APP_PORT: number = 4000;
console.log('server');

// Serve the Relay app
// Calling webpack() without a callback as 2nd property returns a Compiler object.
// The libdefs don't like it, but it's fine.  $FlowFixMe https://webpack.js.org/api/node/
const compiler: webpack.Compiler = webpack({
  mode: 'development',
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src', 'App.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/, /__generated__/ ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'App.js',
    path: '/',
  },
});

const app: WebpackDevServer = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/src/',
  stats: {colors: true},
});

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

function sendJsonContent(res, obj) {
  const json = JSON.stringify(obj, null, 2);
  res.write(
    `\r\n---\r\nContent-Type: application/json\r\nContent-Length: ${json.length}\r\n\r\n${json}\r\n`,
  );
}

app.use('/graphql', bodyParser.json(), async (req, res, next) => {
  const { patches, ...initial } = await graphql({
    schema,
    source: req.body.query,
    variableValues: req.body.variables,
  });
  if (!patches) {
    res.json(initial);
    return;
  }
  res.set('content-type', 'multipart/mixed; boundary="-"');
  sendJsonContent(res, initial);
  for await (const patch of patches) {
    sendJsonContent(res, patch);
  }
  res.write(`\r\n-----\r\n`);
  res.end();
});

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
