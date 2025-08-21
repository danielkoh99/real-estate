import { Input } from "@heroui/react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type PasswordInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  registerKey: keyof T;
  errors: FieldErrors<T>;
  label?: string;
};

export const PasswordInput = <T extends FieldValues>({
  register,
  registerKey,
  errors,
  label = "Password",
}: PasswordInputProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const key = registerKey as string;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Input
      endContent={
        <EyeIcon
          className="w-5 h-5 hover:opacity-100 opacity-70 cursor-pointer"
          onClick={toggleVisibility}
        />
      }
      label={label}
      type={isVisible ? "text" : "password"}
      {...register(key as any)}
      errorMessage={errors[key]?.message as string | undefined}
      isInvalid={!!errors[key]}
    />
  );
};
