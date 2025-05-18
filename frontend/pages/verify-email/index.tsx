"use client";

import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useQueryState } from "nuqs";

import { apiRequest } from "@/utils";

async function verifyEmail(token: string) {
  const response = await apiRequest<{ message: string }>({
    url: `/auth/verify-email/${token}`,
    method: "POST",
  });

  return response;
}

export default function VerifyEmailPage() {
  const [token] = useQueryState("token");

  const router = useRouter();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: () => verifyEmail(token ?? ""),
    onSuccess: () => {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    },
    onError: () => {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    },
  });

  useEffect(() => {
    if (router.isReady && !token) {
      router.push("/login");
    }

    if (token) mutate();
  }, [token]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center space-y-6">
        <h1 className="text-2xl font-bold">Email Verification</h1>

        {isPending && (
          <div className="text-blue-600">Verifying your email...</div>
        )}

        {isSuccess && (
          <div className="space-y-4">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto" />
            <p className="text-green-600 font-medium">
              Your email has been verified!
            </p>
            <button
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
              onClick={() => router.push("/login")}
            >
              Go to Login
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        )}

        {isError && (
          <div className="space-y-4">
            <XCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
            <p className="text-red-600 font-medium">
              Verification failed: {(error as Error).message}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
