'use client';
import React, { useReducer, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import axios from 'axios';
import ErrorListAlert from '../errorlist-alert';
import { registerSchema, RegisterUserInputs } from '@/lib/validationSchemas';
import ErrorMessage from '../error-message';
import SocialLogins from '@/app/register/social-logins';
import { ApiResponseError } from '@/lib/definitions';
import { formStatusReducer, initialFormStatus } from './form-lib';

const Signup = () => {
  const [formStatus, setFormStatus] = useReducer(
    formStatusReducer,
    initialFormStatus
  );
  const [apiResponse, setApiResponse] = useState<ApiResponseError>({
    _errors: [''],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegisterUserInputs> = async (data) => {
    setFormStatus({ type: 'RESET' });
    try {
      await axios.post('/api/account/register', data);
      setFormStatus({ type: 'SUCCESS', isSuccess: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiResponseError;

        setFormStatus({ type: 'ERROR', hasError: true });
        setApiResponse(apiError);
      } else {
        console.error('An unexpected error occurred:', error);
        setFormStatus({ type: 'ERROR', hasError: true });
        setApiResponse({ _errors: ['An unexpected error occurred'] });
      }
    } finally {
      setFormStatus({ type: 'SUBMIT', isSubmit: false });
    }
  };

  return (
    <div>
      {formStatus.isSuccess && (
        <div className="w-full flex items-center flex-col space-y-3 my-3">
          <Alert
            color="success"
            title="Check your email to complete your registration"
          />

          <div className="flex space-x-3">
            <Link href="/">
              <Button>Back to Homepage</Button>
            </Link>
            <Link href="/api/auth/signin">
              <Button>Already have an account? Login</Button>
            </Link>
          </div>
        </div>
      )}
      {!formStatus.isSuccess && (
        <>
          <SocialLogins />
          {formStatus.hasError && <ErrorListAlert apiErrors={apiResponse} />}
          <form
            className="flex flex-col mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="budget-form-group">
              <input
                type="email"
                id="email"
                placeholder="insert your email"
                className="budget-input"
                autoComplete="off"
                {...register('email')}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>
            <div className="budget-form-group">
              <input
                type="password"
                id="password"
                placeholder="insert your password"
                className="budget-input"
                autoComplete="off"
                {...register('password')}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </div>
            <div className="mb-4">
              <Button
                isDisabled={formStatus.isSubmit}
                type="submit"
                className="rounded w-full py-2 px-2 bg-primary text-center capitalize leading-normal font-semibold text-lg text-background transition-all duration-500 hover:bg-yellow-400 disabled:opacity-50"
              >
                start your calculation
                {formStatus.isSubmit && <Spinner color="success" size="sm" />}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Signup;
