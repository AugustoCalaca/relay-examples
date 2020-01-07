/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type TodoSlowField$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Todo_todo$ref: FragmentReference;
declare export opaque type Todo_todo$fragmentType: Todo_todo$ref;
export type Todo_todo = {|
  +complete: boolean,
  +id: string,
  +text: string,
  +$fragmentRefs: TodoSlowField$ref,
  +$refType: Todo_todo$ref,
|};
export type Todo_todo$data = Todo_todo;
export type Todo_todo$key = {
  +$data?: Todo_todo$data,
  +$fragmentRefs: Todo_todo$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Todo_todo",
  "type": "Todo",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "complete",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "text",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "TodoSlowField",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'ddfdb61b3ffccb26fdea8cc65c30393c';
module.exports = node;
