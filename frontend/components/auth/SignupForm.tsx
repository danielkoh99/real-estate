"use client";
import { Input, Button, Radio, RadioGroup } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { signupScheme } from "@/schemes";
import toast from "@/utils/toast";
import { signUpUser } from "@/services/user";
import { PublicRoles } from "@/types";

type Schema = z.infer<typeof signupScheme>;

const SignupForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(signupScheme),
  });
  const { mutate } = useMutation({
    mutationFn: signUpUser,
    mutationKey: ["signup"],
    onSuccess: (response) => {
      toast.success("Success", response.message ?? "", undefined);
      reset();
    },
    onError: (error: any) => {
      toast.error("Error", error.message);
    },
  });

  const onSignup = (data: Schema) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={handleSubmit(onSignup)}
    >
      <div className="flex gap-2">
        <Input
          errorMessage={errors.firstName?.message}
          isInvalid={errors.firstName ? true : false}
          {...register("firstName")}
          fullWidth
          name="firstName"
          placeholder="First Name"
        />
        <Input
          errorMessage={errors.lastName?.message}
          isInvalid={errors.lastName ? true : false}
          {...register("lastName")}
          fullWidth
          name="lastName"
          placeholder="Last Name"
        />
      </div>
      <Input
        errorMessage={errors.email?.message}
        isInvalid={errors.email ? true : false}
        {...register("email")}
        fullWidth
        name="email"
        placeholder="Email"
      />
      <Input
        errorMessage={errors.password?.message}
        isInvalid={errors.password ? true : false}
        {...register("password")}
        fullWidth
        name="password"
        placeholder="Password"
        type="password"
      />
      <Input
        errorMessage={errors.phone?.message}
        isInvalid={errors.phone ? true : false}
        {...register("phone")}
        fullWidth
        name="phone"
        placeholder="Phone number"
      />
      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <RadioGroup
            {...field}
            errorMessage={errors.role?.message}
            isInvalid={!!errors.role}
            label="Select type of user"
          >
            {Object.keys(PublicRoles).map((key) => {
              const value = PublicRoles[key as keyof typeof PublicRoles];

              return (
                <Radio key={value} value={value}>
                  {key}
                </Radio>
              );
            })}
          </RadioGroup>
        )}
      />
      <Button color="primary" type="submit" variant="ghost">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
