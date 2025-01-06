import React from 'react';

const Signup = () => {
  return (
    <div>
      <form className="flex flex-col">
        <div className="budget-form-group">
          <input
            type="number"
            name="income"
            id="income"
            placeholder="insert your income"
            className="budget-input"
            autoComplete="off"
          />
          <label htmlFor="income" className="budget-label">
            insert your income
          </label>
        </div>
        <div className="budget-form-group">
          <input
            type="text"
            name="goals"
            id="goals"
            placeholder="insert your goals"
            className="budget-input"
            required
          />
          <label htmlFor="goals" className="budget-label">
            insert your goals
          </label>
        </div>
        <div className="pt-16">
          <button
            disabled={false}
            type="button"
            className="w-full py-3 px-2 bg-primary text-center capitalize leading-normal font-normal text-xl transition-all duration-500 hover:bg-yellow-400 disabled:opacity-50"
          >
            start your calculation
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
