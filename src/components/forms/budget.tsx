'use client';
import React, { useState, useRef } from 'react';

const Budget = () => {
  const [category, setCategory] = useState('Select Category');
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

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

  return (
    <div className="bg-background border p-8 rounded">
      <form className="flex flex-col">
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
        <div className="budget-form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="insert expense name"
            className="budget-input"
            autoComplete="off"
            required
          />
        </div>
        <div className="budget-form-group">
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="insert expense amount"
            className="budget-input"
            autoComplete="off"
          />
        </div>

        <div className="pt-8">
          <button
            type="button"
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
