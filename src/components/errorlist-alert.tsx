import React from 'react';
import { Alert } from '@nextui-org/alert';
import { ApiResponseError } from '@/lib/definitions';

// const apiErrors: ApiResponseError = {
//   _errors: ['Bug1'],
//   name: {
//     _errors: ['Expense name is required'],
//   },
//   amount: {
//     _errors: ['Invalid number', 'number is required'],
//   },
// };

const ErrorListAlert: React.FC<{ apiErrors: ApiResponseError }> = ({
  apiErrors,
}) => {
  const errors = apiErrors?._errors;

  if (!errors) {
    return null;
  }

  return (
    <div className="relative flex items-center w-full px-1 py-1 mx-auto  md:px-3 lg:px-6 max-w-7xl ">
      <div>
        <ul className="pl-5 space-y-1 list-none">
          {Object.entries(apiErrors).map(([title, errorObj]) => {
            if (Array.isArray(errorObj)) {
              return errorObj.map((description, i) => {
                return (
                  <li key={i}>
                    <Alert
                      description={description}
                      title={title}
                      color="danger"
                    />
                  </li>
                );
              });
            }
            return Object.entries(errorObj).map(([, errors], idx) => {
              return errors.map((error) => {
                return (
                  <li key={idx}>
                    <Alert description={error} title={title} color="warning" />
                  </li>
                );
              });
            });
          })}
        </ul>
      </div>
    </div>
  );
};

export default ErrorListAlert;
