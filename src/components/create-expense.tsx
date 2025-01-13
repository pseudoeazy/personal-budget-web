'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import Budget from './forms/budget';

interface NewExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export const NewExpense: React.FC<NewExpenseProps> = ({
  isOpen,
  onClose,
  onOpenChange,
}) => {
  return (
    <Modal
      id="new_expense"
      data-testid="new_expense"
      className="modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="modal-box">
        <ModalHeader>Add New Expense</ModalHeader>
        <ModalBody>
          <Budget />
        </ModalBody>
        <ModalFooter className="modal-action">
          <Button id="close_new_expense" className="btn" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface Props {
  isMobile: boolean;
}
const CreateExpense: React.FC<Props> = ({ isMobile = false }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  function handleClick() {
    onOpen();
  }

  return (
    <>
      {isMobile && (
        <>
          <Button
            data-testid="mobile_new_expense"
            onPress={handleClick}
            className="absolute -bottom-6 -right-3 sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary"
          >
            <Plus className="w-12 h-12" />
          </Button>
          <NewExpense
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
          />
        </>
      )}
      {!isMobile && (
        <div>
          <Button
            type="button"
            className="hidden sm:block px-10 rounded-none text-xl text-background bg-primary capitalize  font-semibold"
            onPress={handleClick}
          >
            new expense
          </Button>
          <NewExpense
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
          />
        </div>
      )}
    </>
  );
};

export default CreateExpense;
