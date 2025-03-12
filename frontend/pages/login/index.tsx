import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import DefaultLayout from "@/layouts/default";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const callbackUrl = (router.query.callbackUrl as string) || "/";

  useEffect(() => {
    if (session) {
      router.push(callbackUrl);
    }
  }, [session, callbackUrl, router]);

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center h-full bg-gradient-to-br">
        <Card className="w-full max-w-md shadow-xl rounded-2xl bg-white/90 backdrop-blur-lg">
          <CardBody className="p-6">
            <Tabs
              fullWidth
              aria-label="Auth Options"
              className="w-full"
              size="lg"
            >
              <Tab key="login" title="Login">
                <LoginForm />
              </Tab>
              <Tab key="signup" title="Sign Up">
                <SignupForm />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}
