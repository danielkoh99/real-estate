import { Card, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import useUserMutations from "../profileMutations";

import { passwordResetScheme } from "@/schemes";
import toast from "@/utils/toast";
import { PasswordInput } from "@/components/auth/PasswordInput";

type PasswordFormData = z.infer<typeof passwordResetScheme>;

export default function PasswordChange() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordResetScheme),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const { updatePasswordMutation } = useUserMutations();
  const { data: session } = useSession();
  const onSubmit = async (data: PasswordFormData) => {
    const userId = session?.user?.id;

    if (!userId) {
      toast.error("Error", "User ID not found in session.");

      return;
    }
    updatePasswordMutation.mutate({
      userId: session?.user.id,
      data,
    });
  };

  return (
    <Card className="w-full mx-auto p-6 shadow-xl rounded-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Change Password</h1>
        <p className="text-sm text-gray-500">
          Enter and confirm your new password.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <PasswordInput
            errors={errors}
            register={register}
            registerKey="currentPassword"
          />
        </div>
        <div className="w-full">
          <PasswordInput
            errors={errors}
            label="New Password"
            register={register}
            registerKey="newPassword"
          />
        </div>
        <div>
          <PasswordInput
            errors={errors}
            label="Confirm new Password"
            register={register}
            registerKey="confirmPassword"
          />
        </div>
        <Button
          className="w-full"
          color="primary"
          isLoading={isSubmitting}
          type="submit"
        >
          Update Password
        </Button>
      </form>
    </Card>
  );
}
