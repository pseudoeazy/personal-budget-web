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
import { Income } from '@/lib/definitions';

interface DeleteModalProps {
  income: Income;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
const DeletModal: React.FC<DeleteModalProps> = ({
  income,
  isOpen,
  onClose,
  onOpenChange,
}) => {
  const { mutate } = useSWRConfig();

  const refetchIncome = async () => {
    const rowsPerPage = [5, 10, 20];
    for (const row of rowsPerPage) {
      await mutate(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/incomes?page=1&limit=${row}`
      );
    }
  };

  async function deleteIncome(id: string) {
    try {
      await axios.delete('/api/incomes/' + id);
      onClose();
      await refetchIncome();
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
              Remove {income.name}
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this income?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={() => deleteIncome(income.id)}
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
  income: Income;
}
const DeleteIncome: React.FC<Props> = ({ income }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Tooltip color="danger" content="Delete income">
        <span className="text-lg text-danger cursor-pointer" onClick={onOpen}>
          <Trash2 />
        </span>
      </Tooltip>
      <DeletModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        income={income}
      />
    </>
  );
};

export default DeleteIncome;
