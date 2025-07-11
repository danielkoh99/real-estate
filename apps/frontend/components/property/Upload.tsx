"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { FileWithPreview } from "@/types";

import "swiper/css/bundle";

const heic2any = typeof window !== "undefined" ? require("heic2any") : null;

const Upload = ({
  setFiles,
  files,
  loading,
  setLoading,
}: {
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  files: FileWithPreview[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  const onDrop = useCallback(
    async (acceptedFiles: File[], rejections: FileRejection[]) => {
      setLoading(true);
      if (typeof window === "undefined") return;
      const convertedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          if (file.type === "image/heic" || file.type === "image/heif") {
            try {
              const blob = await heic2any({ blob: file, toType: "image/png" });
              const convertedFile = new File(
                [blob as Blob],
                file.name.replace(/\.heic|\.heif|\.HEIC/, ".png"),
                { type: "image/png" },
              );

              return Object.assign(convertedFile, {
                url: URL.createObjectURL(convertedFile),
              });
            } catch (error) {
              return null;
            }
          }

          return Object.assign(file, { url: URL.createObjectURL(file) });
        }),
      );

      setFiles((prev) => [
        ...prev,
        ...(convertedFiles.filter(Boolean) as FileWithPreview[]),
      ]);

      setFileRejections(rejections);
      setLoading(false);
    },
    [],
  );

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles((prevFiles) =>
      prevFiles.filter(
        (f) => f.name !== fileToRemove.name || f.size !== fileToRemove.size,
      ),
    );

    URL.revokeObjectURL(fileToRemove.url);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
      "image/svg+xml": [],
      "image/avif": [],
      "image/heic": [],
      "image/heif": [],
    },
    maxSize: 25 * 1024 * 1024,
    maxFiles: 15,
  });

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className={`h-full flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-all duration-200
           cursor-pointer ${
             isDragActive
               ? "border-blue-500 bg-blue-100"
               : "border-gray-300 hoverorder-blue-500"
           }`}
      >
        <div className="w-full">
          <input {...getInputProps()} />
          <p className="text-lg font-semibold text-center">
            Drag & drop your files here, or click to select
          </p>
        </div>

        {fileRejections.length > 0 && (
          <ul className="mt-4 text-red-500 text-sm">
            {fileRejections.map((fileRejection) => (
              <li key={fileRejection.file.name}>
                {fileRejection.file.name}:{" "}
                {fileRejection.errors.map((error) => (
                  <span key={error.code} className="block">
                    {error.code === "file-too-large" &&
                      "File is too large (max 25MB)"}
                    {error.code === "file-invalid-type" &&
                      "Unsupported file type"}
                    {error.code === "too-many-files" &&
                      "Too many files (max 15)"}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Uploaded Files Preview */}
      {files.length > 0 && (
        <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative group w-36 aspect-square flex-shrink-0 rounded-md overflow-hidden"
            >
              <Image
                fill
                alt={file.name}
                className="object-cover"
                src={file.url}
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                type="button"
                onClick={() => removeFile(file)}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-white mt-2">Uploading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
