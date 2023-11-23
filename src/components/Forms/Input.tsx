import React from 'react';

type InputType = React.ComponentProps<'input'> & {
  label: string;
};

const Input = ({ label, id, ...props }: InputType) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name={id} {...props} />
    </>
  );
};

export default Input;
