import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type { TodoSlowField } from './__generated__/TodoSlowField.graphql';

type Props = {|
  +todo: TodoSlowField,
|};

const TodoSlow = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment TodoSlowField on Todo {
        slowField
      }
    `,
    props.todo,
  );
  
  return <div>{data.slowField}</div>;
};

export default TodoSlow;