import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { JSX } from "react";

import CustomModal from "@/components/global/CustomModal";
import { useModal } from "@/contexts/ModalContext";

const RenderContent = (): JSX.Element => {
  return (
    <div>
      <h1>Logging in is required to use this functionality</h1>
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
      <Button color="primary" variant="ghost" onPress={handleReroute}>
        Log in
      </Button>
    </div>
  );
};
const LoginRequiredModal: React.FC = (): JSX.Element => {
  return (
    <CustomModal
      actions={RenderActions}
      content={RenderContent}
      title="Login required"
    />
  );
};

export default LoginRequiredModal;
