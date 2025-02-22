import { Input, Button } from "@heroui/react";

const SignupForm = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <Input fullWidth placeholder="First Name" />
      <Input fullWidth placeholder="Last Name" />
      <Input fullWidth placeholder="Name" />
      <Input fullWidth placeholder="Email" />
      <Input fullWidth placeholder="Password" />
      <Input fullWidth placeholder="Confirm password" />
      <Button color="secondary" variant="ghost">
        Sign Up
      </Button>
    </div>
  );
};

export default SignupForm;
