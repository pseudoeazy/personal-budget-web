import React from 'react';
import { format } from 'date-fns';
import {
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
import { refetch } from '@/lib/utils';

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

const DeletModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onOpenChange,
}) => {
  const { mutate } = useSWRConfig();

  async function deleteExpenses() {
    try {
      await axios.delete('/api/expenses/');
      onClose();
      await refetch('/api/expense', mutate);
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
              Are you sure you want to reset your expenses?
            </ModalHeader>
            <ModalBody>
              <p className="text-center text-red-300">
                ⚠︎ This will delete all expenses for{' '}
                {format(new Date(), 'MMMM')}{' '}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={() => deleteExpenses()}
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

const ResetExpenses = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        style={{
          boxShadow: `0px 3.511px 10.534px 0px rgba(0, 0, 0, 0.04)`,
        }}
        type="button"
        className="w-full flex items-center justify-center py-2 px-15 rounded text-center text-xl text-background bg-primary capitalize  font-normal "
      >
        reset expenses
      </Button>
      <DeletModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
};

export default ResetExpenses;
