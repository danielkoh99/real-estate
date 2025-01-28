import { Tab, Tabs } from "@heroui/react";

import LoginForm from "@/components/LoginForm";
import { title } from "@/components/primitives";
import SignupForm from "@/components/SignupForm";
import DefaultLayout from "@/layouts/default";

export default function UserProfilePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>login </h1>
          <div className="flex w-full flex-col items-center">
            <Tabs fullWidth aria-label="Options" size="md">
              <Tab key="login" title="Login">
                <LoginForm />
              </Tab>
              <Tab key="signup" title="Sign Up">
                <SignupForm />
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
