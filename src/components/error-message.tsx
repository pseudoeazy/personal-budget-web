import React, { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <small className="block w-full text-primary text-center font-normal pt-0.5">
      {children}
    </small>
  );
};

export default ErrorMessage;
