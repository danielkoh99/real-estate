import type { FC, JSX } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import { useModal } from "@/contexts/ModalContext";

const CustomModal: FC<{
  title: string;
  content: () => JSX.Element;
  actions: () => JSX.Element;
}> = ({ content, actions, title }): JSX.Element => {
  const { isOpen, closeModal } = useModal();

  return (
    <Modal
      backdrop={"blur"}
      className="z-50"
      isOpen={isOpen}
      onClose={closeModal}
    >
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
