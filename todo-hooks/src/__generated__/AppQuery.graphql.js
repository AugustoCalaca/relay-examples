/**
 * @flow
 * @relayHash fdfa62782e6420bfcb0a34ed110d2ea0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TodoApp_user$ref = any;
export type AppQueryVariables = {|
  userId?: ?string
|};
export type AppQueryResponse = {|
  +user: ?{|
    +$fragmentRefs: TodoApp_user$ref
  |}
|};
export type AppQuery = {|
  variables: AppQueryVariables,
  response: AppQueryResponse,
|};
*/


/*
query AppQuery(
  $userId: String
) {
  user(id: $userId) {
    ...TodoApp_user
    id
  }
}

fragment TodoApp_user on User {
  id
  userId
  totalCount
  ...TodoListFooter_user
  ...TodoList_user
}

fragment TodoListFooter_user on User {
  id
  userId
  completedCount
  todos(first: 2147483647) {
    edges {
      node {
        id
        complete
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  totalCount
}

fragment TodoList_user on User {
  todos(first: 2147483647) {
    edges @stream(label: "TodoList_user$stream$TodoList_todos", initial_count: 0) {
      node {
        id
        complete
        ...Todo_todo
        __typename
      }
      cursor
    }
    ... on TodoConnection @defer(label: "TodoList_user$defer$TodoList_todos$pageInfo") {
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  id
  userId
  totalCount
  completedCount
  ...Todo_user
}

fragment TodoSlowField on Todo {
  slowField
}

fragment Todo_todo on Todo {
  ...TodoSlowField @defer(label: "Todo_todo$defer$TodoSlowField")
  complete
  id
  text
}

fragment Todo_user on User {
  id
  userId
  totalCount
  completedCount
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userId",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "complete",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pageInfo",
  "storageKey": null,
  "args": null,
  "concreteType": "PageInfo",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "endCursor",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasNextPage",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TodoApp_user",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "userId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalCount",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "completedCount",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "todos",
            "storageKey": "todos(first:2147483647)",
            "args": (v3/*: any*/),
            "concreteType": "TodoConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "TodoEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Todo",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
                ]
              },
              (v7/*: any*/),
              {
                "if": null,
                "kind": "Stream",
                "label": "TodoList_user$stream$TodoList_todos",
                "metadata": null,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "TodoEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Todo",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "text",
                            "args": null,
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          {
                            "if": null,
                            "kind": "Defer",
                            "label": "Todo_todo$defer$TodoSlowField",
                            "metadata": null,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "slowField",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          }
                        ]
                      },
                      (v6/*: any*/)
                    ]
                  }
                ]
              },
              {
                "if": null,
                "kind": "Defer",
                "label": "TodoList_user$defer$TodoList_todos$pageInfo",
                "metadata": {
                  "fragmentTypeCondition": "TodoConnection"
                },
                "selections": [
                  (v7/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "todos",
            "args": (v3/*: any*/),
            "handle": "connection",
            "key": "TodoList_todos",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $userId: String\n) {\n  user(id: $userId) {\n    ...TodoApp_user\n    id\n  }\n}\n\nfragment TodoApp_user on User {\n  id\n  userId\n  totalCount\n  ...TodoListFooter_user\n  ...TodoList_user\n}\n\nfragment TodoListFooter_user on User {\n  id\n  userId\n  completedCount\n  todos(first: 2147483647) {\n    edges {\n      node {\n        id\n        complete\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  totalCount\n}\n\nfragment TodoList_user on User {\n  todos(first: 2147483647) {\n    edges @stream(label: \"TodoList_user$stream$TodoList_todos\", initial_count: 0) {\n      node {\n        id\n        complete\n        ...Todo_todo\n        __typename\n      }\n      cursor\n    }\n    ... on TodoConnection @defer(label: \"TodoList_user$defer$TodoList_todos$pageInfo\") {\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n  id\n  userId\n  totalCount\n  completedCount\n  ...Todo_user\n}\n\nfragment TodoSlowField on Todo {\n  slowField\n}\n\nfragment Todo_todo on Todo {\n  ...TodoSlowField @defer(label: \"Todo_todo$defer$TodoSlowField\")\n  complete\n  id\n  text\n}\n\nfragment Todo_user on User {\n  id\n  userId\n  totalCount\n  completedCount\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '756fd1687cfa5c7e9f1efc41392fa0aa';
module.exports = node;
