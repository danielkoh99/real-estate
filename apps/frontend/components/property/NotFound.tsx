import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Card } from "@heroui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <Card className="flex flex-col items-center justify-center text-center p-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <ExclamationCircleIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        No Properties Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
        We couldn’t find any propertie.
      </p>
      <Link className="mt-6" href="/">
        Go home
      </Link>
    </Card>
  );
};

export default NotFound;
