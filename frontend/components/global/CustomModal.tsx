import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";

const CustomModal: React.FC<{
  title: any;
  content: () => React.ReactNode;
  actions: () => React.ReactNode;
}> = ({ content, actions, title }): JSX.Element => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{content()}</ModalBody>
            <ModalFooter>
              {actions()}
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
