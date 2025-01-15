type FormStatusKey = 'isSubmit' | 'hasError' | 'isSuccess';
type FormStatus = {
  [K in FormStatusKey]: boolean;
};

export const initialFormStatus = {
  isSuccess: false,
  isSubmit: false,
  hasError: false,
};

type FormStatusAction =
  | { type: 'SUBMIT'; isSubmit: boolean }
  | { type: 'SUCCESS'; isSuccess: boolean }
  | { type: 'ERROR'; hasError: boolean }
  | { type: 'RESET' };

export const formStatusReducer = (
  state: FormStatus,
  action: FormStatusAction
): FormStatus => {
  switch (action.type) {
    case 'SUBMIT':
      return { ...state, isSubmit: action.isSubmit };
    case 'SUCCESS':
      return { ...state, isSuccess: action.isSuccess };
    case 'ERROR':
      return { ...state, hasError: action.hasError };
    case 'RESET':
      return initialFormStatus;
    default:
      return state;
  }
};
