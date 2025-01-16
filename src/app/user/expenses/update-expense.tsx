import React from 'react';
import { Pen } from 'lucide-react';
import {
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

import { Expense } from '@/lib/definitions';
import EditExpense from '@/components/forms/edit-expense';

interface EditModalProps {
  expense: Expense;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
const EditModal: React.FC<EditModalProps> = ({
  expense,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit {expense.name}
            </ModalHeader>
            <ModalBody>
              <EditExpense expense={expense} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const UpdateExpense = ({ expense }: { expense: Expense }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Tooltip content="Edit expense">
        <span
          className="text-lg text-default-400 cursor-pointer"
          onClick={onOpen}
        >
          <Pen />
        </span>
      </Tooltip>
      <EditModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        expense={expense}
      />
    </>
  );
};

export default UpdateExpense;
