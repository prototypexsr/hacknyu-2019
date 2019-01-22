import * as React from "react";
import { Field } from "react-final-form";
import { ReactNodeLike } from "prop-types";

interface Props {
  when: string;
  is: string;
  children: ReactNodeLike
}

const Condition: React.SFC<Props> = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  );

export default Condition;