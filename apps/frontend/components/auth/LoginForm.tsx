"use client";
import { Input, Button, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { signinScheme, signupScheme } from "@/schemes";
import toast from "@/utils/toast";

type Schema = z.infer<typeof signupScheme>;

const LoginForm: React.FC<{
  setSelected: (key: string) => void;
}> = ({ setSelected }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(signinScheme),
    mode: "onChange",
  });
  const handleLogin = async (data: Schema) => {
    const { email, password } = data;
    const callbackUrl = (router.query.callbackUrl as string) || "/";

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      toast.error("Error", response.error);
    } else {
      router.push(callbackUrl);
    }
    reset();
  };

  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Input
        {...register("email")}
        fullWidth
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        placeholder="Email"
      />

      <Input
        placeholder="Password"
        type="password"
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
      />
      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link size="sm" onPress={() => setSelected("sign-up")}>
          Sign up
        </Link>
      </p>
      <Button color="primary" type="submit" variant="ghost">
        Login
      </Button>
      <Link className="text-sm text-blue-500" href="/forgot-password">
        Forgot passwod? Click here to change it.
      </Link>
    </form>
  );
};

export default LoginForm;
