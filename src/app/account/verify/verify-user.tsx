'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Alert } from '@nextui-org/alert';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import ErrorListAlert from '@/components/errorlist-alert';
import { ApiResponseError } from '@/lib/definitions';
import axios from 'axios';

interface Props {
  email: string;
  token: string;
}
export default function VerifyUser({ email, token }: Props) {
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponseError>({
    _errors: [''],
  });

  useEffect(() => {
    axios
      .post('/api/account/verify', { token, email })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          const apiError = error.response?.data as ApiResponseError;

          setHasError(true);
          setApiResponse(apiError);
        } else {
          console.error('An unexpected error occurred:', error);
          setHasError(true);
          setApiResponse({ _errors: ['An unexpected error occurred'] });
        }
      });
  }, []);
  console.log({ apiResponse });
  return (
    <main>
      <div className="w-screen h-screen flex items-center justify-center">
        <section className="w-96 flex flex-col items-center justify-center mx-auto text-center font-primary ">
          {!hasError && !isSuccess && (
            <div>
              <p>Monthly Budget is verifying your account.</p>
              <p>Please wait...</p>
              <Spinner size="sm" color="primary" />
            </div>
          )}
          <div className="h-96 w-96 flex flex-col items-center justify-center mx-auto my-4 text-sm bg-gray-100 text-center p-8 rounded">
            <div className="flex justify-center w-48 mx-auto mb-6  text-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="monthly budget logo"
                  width={120}
                  height={120}
                  priority
                />
              </Link>
            </div>
            {hasError && (
              <div className="w-full flex items-center flex-col space-y-3 my-3 ">
                {hasError && <ErrorListAlert apiErrors={apiResponse} />}
              </div>
            )}
            {isSuccess && (
              <div className="w-full flex items-center flex-col space-y-3 my-3">
                <Alert
                  color="success"
                  title="Account verification successful."
                />

                <div className="flex space-x-3">
                  <Link href="/">
                    <Button>Back to Homepage</Button>
                  </Link>
                  <Link href="/api/auth/signin">
                    <Button> Login</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
