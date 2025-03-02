'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, Select, SelectItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSWRConfig } from 'swr';
import { categories } from '@/data/categories';
import ErrorListAlert from '../errorlist-alert';
import { ApiResponseError, Expense } from '@/lib/definitions';
import axios from 'axios';
import {
  CreateExpenseInputs,
  createExpenseSchema,
} from '@/lib/validationSchemas';

import ErrorMessage from '../error-message';

const EditExpense: React.FC<{ expense: Expense }> = ({ expense }) => {
  const { mutate } = useSWRConfig();
  const [category, setCategory] = useState(expense.categoryId);
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
  } = useForm<CreateExpenseInputs>({
    resolver: zodResolver(createExpenseSchema),
    mode: 'onChange',
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  useEffect(() => {
    setValue('categoryId', category);
  }, [category, setValue]);

  useEffect(() => {
    reset({ name: expense.name, amount: expense.amount });
  }, [expense, reset]);

  const refetchExpense = async () => {
    const rowsPerPage = [5, 10, 20];
    for (const row of rowsPerPage) {
      await mutate(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?page=1&limit=${row}`
      );
    }
  };

  const onSubmit: SubmitHandler<CreateExpenseInputs> = async (data) => {
    setIsSubmit(true);

    try {
      await axios.put('/api/expenses/' + expense.id, data);
      setIsSuccess(true);

      refetchExpense();
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
          <Alert color="success" title={`Expense updated successfully`} />
        </div>
      )}
      {hasError && <ErrorListAlert apiErrors={apiResponse} />}
      {!isSuccess && (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="budget-form-group">
            <Select
              isRequired
              className="max-w-xs"
              defaultSelectedKeys={[expense.categoryId]}
              label="Select a category"
              onChange={handleSelect}
            >
              {categories.map((category) => (
                <SelectItem key={category.id}>{category.label}</SelectItem>
              ))}
            </Select>
          </div>

          <input
            type="hidden"
            {...register('categoryId')}
            id="categoryId"
            className="block"
          />
          <div className="budget-form-group">
            <input
              type="text"
              {...register('name')}
              id="name"
              placeholder="Insert expense name"
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
              placeholder="Insert expense amount"
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
              Update Expense {isSubmit && <Spinner color="success" size="sm" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditExpense;
