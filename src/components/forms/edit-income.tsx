'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSWRConfig } from 'swr';

import ErrorListAlert from '../errorlist-alert';
import { ApiResponseError, Income } from '@/lib/definitions';
import axios from 'axios';
import {
  CreateIncomeInputs,
  createIncomeSchema,
} from '@/lib/validationSchemas';

import ErrorMessage from '../error-message';

const EditIncome: React.FC<{ income: Income }> = ({ income }) => {
  const { mutate } = useSWRConfig();
  const [isSubmit, setIsSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponseError>({
    _errors: [''],
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIncomeInputs>({
    resolver: zodResolver(createIncomeSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    reset({ name: income.name, amount: income.amount });
  }, [income, reset]);

  const refetchIncome = async () => {
    const rowsPerPage = [5, 10, 20];
    for (const row of rowsPerPage) {
      await mutate(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/incomes?page=1&limit=${row}`
      );
    }
  };
  const onSubmit: SubmitHandler<CreateIncomeInputs> = async (data) => {
    setIsSubmit(true);

    try {
      await axios.put('/api/incomes/' + income.id, data);
      setIsSuccess(true);

      refetchIncome();
    } catch (error: unknown) {
      console.log({ error });
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiResponseError;

        setHasError(true);
        setApiResponse(apiError);
      } else {
        console.error('An unexpected error occurred:', error);
        setHasError(true);

        setApiResponse({ _errors: ['An unexpected error occurred'] });
      }
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="p-8 rounded">
      {isSuccess && (
        <div className="w-full flex items-center my-3">
          <Alert color="success" title={`Income updated successfully`} />
        </div>
      )}
      {hasError && <ErrorListAlert apiErrors={apiResponse} />}
      {!isSuccess && (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="budget-form-group">
            <input
              type="text"
              {...register('name')}
              id="name"
              placeholder="Insert income name"
              className="budget-input"
              autoComplete="off"
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>
          <div className="budget-form-group">
            <input
              type="number"
              {...register('amount')}
              id="amount"
              placeholder="Insert income amount"
              className="budget-input"
              autoComplete="off"
            />
            <ErrorMessage>{errors.amount?.message}</ErrorMessage>
          </div>
          <div className="pt-8">
            <Button
              isDisabled={isSubmit}
              type="submit"
              className="rounded w-full py-2 px-2 bg-primary text-center capitalize leading-normal font-semibold text-lg text-background transition-all duration-500 hover:bg-yellow-400 disabled:opacity-50"
            >
              Update Income {isSubmit && <Spinner color="success" size="sm" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditIncome;
