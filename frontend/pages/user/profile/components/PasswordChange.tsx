import { Card, Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { passwordSchema } from "@/schemes";

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordChange() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    console.log("Password changed:", data.password);
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-xl rounded-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Change Password</h1>
        <p className="text-sm text-gray-500">
          Enter and confirm your new password.
        </p>
      </div>

      <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <Input
            label="New password"
            type="password"
            {...register("password")}
            errorMessage={errors.password?.message}
          />
        </div>
        <div className="w-full">
          <Input
            label="Confirm password"
            type="password"
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
        <Button className="w-full" isLoading={isSubmitting} type="submit">
          Update Password
        </Button>
      </Form>
    </Card>
  );
}
