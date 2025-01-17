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

import { Income } from '@/lib/definitions';
import EditIncome from '@/components/forms/edit-income';

interface EditModalProps {
  income: Income;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
const EditModal: React.FC<EditModalProps> = ({
  income,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit {income.name}
            </ModalHeader>
            <ModalBody>
              <EditIncome income={income} />
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

const UpdateIncome = ({ income }: { income: Income }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Tooltip content="Edit income">
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
        income={income}
      />
    </>
  );
};

export default UpdateIncome;
