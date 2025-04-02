import { addToast } from "@heroui/react";

const toast = {
  success: (title: string, message: string) => {
    addToast({
      title: title,
      description: message,
      color: "success",
    });
  },
  error: (title: string, message: string) => {
    addToast({
      title: title,
      description: message,
      color: "danger",
    });
  },
  info: (title: string, message: string) => {
    addToast({
      title: title,
      description: message,
      color: "primary",
    });
  },
  warning: (title: string, message: string) => {
    addToast({
      title: title,
      description: message,
      color: "warning",
    });
  },
};

export default toast;
