'use client';
import React from 'react';
import Budget from './forms/budget';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
}

const NewExpense: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  function handleClose() {
    setIsOpen(!isOpen);
  }

  return (
    <dialog
      id="new_expense"
      data-testid="new_expense"
      className="modal"
      open={isOpen}
    >
      <div className="modal-box">
        <Budget />
        <div className="modal-action">
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

const CreateExpense = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button
        type="button"
        className="hidden sm:block px-10 text-xl text-background bg-primary capitalize  font-semibold"
        onClick={handleClick}
      >
        new expense
      </button>
      <NewExpense isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CreateExpense;
