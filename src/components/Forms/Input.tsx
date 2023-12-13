import React from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputType = React.ComponentProps<'input'> & {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
};

const Input = ({ name, label, register, registerOptions, ...props }: InputType) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input {...props} {...register(name, registerOptions)} />
    </>
  );
};

export default Input;
