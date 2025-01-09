'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import Budget from './forms/budget';

interface NewExpenseProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
}

export const NewExpense: React.FC<NewExpenseProps> = ({
  isOpen,
  setIsOpen,
}) => {
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

interface Props {
  isMobile: boolean;
}
const CreateExpense: React.FC<Props> = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {isMobile && (
        <>
          <button
            data-testid="mobile_new_expense"
            onClick={handleClick}
            className="absolute -bottom-6 -right-3 sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary"
          >
            <Plus className="w-12 h-12" />
          </button>
          <NewExpense isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
      {!isMobile && (
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
      )}
    </>
  );
};

export default CreateExpense;
