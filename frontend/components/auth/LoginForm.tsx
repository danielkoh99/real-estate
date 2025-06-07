"use client";
import { Input, Button } from "@heroui/react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { signinScheme } from "@/schemes";
import toast from "@/utils/toast";

type Schema = z.infer<typeof signinScheme>;

const LoginForm = () => {
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
        isInvalid={errors.email ? true : false}
        placeholder="Email"
      />

      <Input
        placeholder="Password"
        type="password"
        {...register("password")}
        errorMessage={errors.password?.message}
        isInvalid={errors.password ? true : false}
      />

      <Button color="primary" type="submit">
        Login
      </Button>
      <Link className="text-sm text-blue-500" href="/forgot-password">
        Forgot passwod? Click here to change it.
      </Link>
    </form>
  );
};

export default LoginForm;
