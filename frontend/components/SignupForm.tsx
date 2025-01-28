import { Card, Input, Button, CardBody } from "@heroui/react";

const SignupForm = () => {
  return (
    <Card>
      <CardBody>
        <div className="flex w-full flex-col gap-5">
          <h3>Sign Up</h3>
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
      </CardBody>
    </Card>
  );
};

export default SignupForm;
