type FormStatusKey = 'isSubmit' | 'hasError' | 'isSuccess';
type FormStatus = {
  [K in FormStatusKey]: boolean;
};

export const initialFormStatus = {
  isSuccess: false,
  isSubmit: false,
  hasError: false,
};

export const formStatusReducer = (state: FormStatus, action: FormStatus) => ({
  ...state,
  ...action,
});
