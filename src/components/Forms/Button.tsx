import React from 'react';

type ButtonType = React.ComponentProps<'button'>;

const Button = ({ children, ...props }: ButtonType) => {
  return <button {...props}>{children}</button>;
};

export default Button;
