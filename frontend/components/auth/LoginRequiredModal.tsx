import React from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import CustomModal from "@/components/global/CustomModal";
import { useModal } from "@/contexts/ModalContext";

const renderContent = () => {
  return (
    <div>
      <h1>Logging in is required to save listing</h1>
    </div>
  );
};
const RenderActions = (): JSX.Element => {
  const router = useRouter();
  const { closeModal } = useModal();

  const handleReroute = () => {
    router.push("/login");
    closeModal();
  };

  return (
    <div>
      <Button onPress={handleReroute}>Log in</Button>
    </div>
  );
};
const LoginRequiredModal: React.FC = (): JSX.Element => {
  return (
    <CustomModal
      actions={RenderActions}
      content={renderContent}
      title="Login required"
    />
  );
};

export default LoginRequiredModal;
