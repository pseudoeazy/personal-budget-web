'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createExpenseSchema } from '@/lib/validationSchemas';

type FormInputs = z.infer<typeof createExpenseSchema>;
interface Props {
  handleClose: () => void;
}

const Budget: React.FC<Props> = ({ handleClose }) => {
  const [category, setCategory] = useState('Select Category');
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(createExpenseSchema),
    mode: 'onChange',
  });

  const handleSelect = (
    e: React.MouseEvent<HTMLUListElement | HTMLLIElement>
  ) => {
    const element = e.target as HTMLLIElement;
    const selectedCategory = element.textContent!;
    setCategory(selectedCategory);

    const detailsEl = dropdownRef.current;
    if (detailsEl) {
      detailsEl.click();
    }
  };

  useEffect(() => {
    setValue('categoryId', category);
  }, [category, setValue]);

  const submitHandler = async (data: FormInputs) => {
    console.log(data);
    console.log('form submitted');
    try {
      // close popup
      handleClose();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="bg-background border p-8 rounded">
      <div className="budget-form-group">
        <details className="dropdown w-full">
          <summary
            className="btn bg-secondary  m-1 w-full border-0"
            ref={dropdownRef}
          >
            {category} &#9660;
          </summary>
          <ul
            onClick={handleSelect}
            className="menu dropdown-content bg-foreground text-black rounded-box z-[1] w-full p-2 shadow"
          >
            <li>
              <span>Food</span>
            </li>
            <li>
              <span>Rent</span>
            </li>
          </ul>
        </details>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
        <input type="hidden" {...register('categoryId')} />
        <div className="budget-form-group">
          <input
            type="text"
            {...register('name')}
            id="name"
            placeholder="insert expense name"
            className="budget-input"
            autoComplete="off"
          />
          {errors.name && <p className="text-primary">{errors.name.message}</p>}
        </div>
        <div className="budget-form-group">
          <input
            type="number"
            {...register('amount', { min: 1 })}
            id="amount"
            placeholder="insert expense amount"
            className="budget-input"
            autoComplete="off"
          />
          {errors.amount && (
            <p className="text-primary">{errors.amount.message}</p>
          )}
        </div>

        <div className="pt-8">
          <button
            type="submit"
            className="rounded w-full py-2 px-2 bg-primary text-center capitalize leading-normal font-semibold text-lg text-background transition-all duration-500 hover:bg-yellow-400 disabled:opacity-50"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default Budget;
