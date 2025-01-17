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

import IncomeForm from './forms/income-form';

interface NewIncomeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export const NewIncome: React.FC<NewIncomeProps> = ({
  isOpen,
  onClose,
  onOpenChange,
}) => {
  return (
    <Modal
      id="new_income"
      data-testid="new_income"
      className="modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="modal-box">
        <ModalHeader>Add New Income</ModalHeader>
        <ModalBody>
          <IncomeForm />
        </ModalBody>
        <ModalFooter className="modal-action">
          <Button id="close_new_income" className="btn" onPress={onClose}>
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
const CreateIncome: React.FC<Props> = ({ isMobile = false }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  function handleClick() {
    onOpen();
  }

  return (
    <>
      {isMobile && (
        <>
          <Button
            data-testid="mobile_new_income"
            onPress={handleClick}
            className="absolute -bottom-6 -right-3 sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-primary"
          >
            <Plus className="w-12 h-12" />
          </Button>
          <NewIncome
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
            new income
          </Button>
          <NewIncome
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
          />
        </div>
      )}
    </>
  );
};

export default CreateIncome;
