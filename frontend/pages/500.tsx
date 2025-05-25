import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Custom404: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-3xl font-semibold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition duration-300"
          href="/"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
