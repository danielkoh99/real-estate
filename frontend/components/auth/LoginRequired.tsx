import React from "react";
import { Button } from "@heroui/react";

import CustomModal from "@/components/global/CustomModal";

const renderContent = () => {
  return (
    <div>
      <h1>Modal content</h1>
    </div>
  );
};
const renderActions = () => {
  return (
    <div>
      <Button>Log in</Button>
    </div>
  );
};
const LoginRequiredModal: React.FC = (): JSX.Element => {
  return (
    <CustomModal
      actions={renderActions}
      content={renderContent}
      title={"Login required"}
    />
  );
};

export default LoginRequiredModal;
