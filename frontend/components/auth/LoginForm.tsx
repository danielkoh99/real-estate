"use client";
import { Input, Button } from "@heroui/react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { signinScheme } from "@/schemes";

type Schema = z.infer<typeof signinScheme>;

const LoginForm = () => {
  const router = useRouter();

  // useForm hook with Zod schema validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Resets form after submission
  } = useForm<Schema>({
    resolver: zodResolver(signinScheme),
  });

  // Form submit handler
  const handleLogin = async (data: Schema) => {
    const { email, password } = data;

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      router.push("/");
    }
    if (response?.error) {
      toast.error(response.error);
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
    </form>
  );
};

export default LoginForm;
