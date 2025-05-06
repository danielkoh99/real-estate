import { addToast } from "@heroui/react";
import { ReactNode } from "react";

const createToast =
  (color: "success" | "danger" | "primary" | "warning") =>
  (
    title: string,
    message: string,
    endContent?: ReactNode,
    timeout: number = 1000,
  ) =>
    addToast({ title, description: message, color, endContent, timeout });

const toast = {
  success: createToast("success"),
  error: createToast("danger"),
  info: createToast("primary"),
  warning: createToast("warning"),
};

export default toast;
