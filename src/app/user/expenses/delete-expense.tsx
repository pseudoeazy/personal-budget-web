import React from 'react';
import { Trash2 } from 'lucide-react';
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
import { useSWRConfig } from 'swr';
import axios from 'axios';
import { Expense } from '@/lib/definitions';

interface DeleteModalProps {
  expense: Expense;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
const DeletModal: React.FC<DeleteModalProps> = ({
  expense,
  isOpen,
  onClose,
  onOpenChange,
}) => {
  const { mutate } = useSWRConfig();

  const refetchExpense = async () => {
    const rowsPerPage = [5, 10, 20];
    for (const row of rowsPerPage) {
      await mutate(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/expenses?page=1&limit=${row}`
      );
    }
  };

  async function deleteExpense(id: string) {
    try {
      await axios.delete('/api/expenses/' + id);
      onClose();
      await refetchExpense();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Remove {expense.name}
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this expense?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={() => deleteExpense(expense.id)}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface Props {
  expense: Expense;
}
const DeleteExpense: React.FC<Props> = ({ expense }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Tooltip color="danger" content="Delete expense">
        <span className="text-lg text-danger cursor-pointer" onClick={onOpen}>
          <Trash2 />
        </span>
      </Tooltip>
      <DeletModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        expense={expense}
      />
    </>
  );
};

export default DeleteExpense;
