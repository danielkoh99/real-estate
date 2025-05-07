// DeleteModal.tsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

type DeleteModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={(open) => onOpenChange(open)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Delete profile</h3>
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete your profile? This action cannot
                be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="ghost"
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
