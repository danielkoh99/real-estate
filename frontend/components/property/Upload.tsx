"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

import { FileWithPreview } from "@/types";
import "swiper/css/bundle";

const Upload = ({
  setFiles,
  files,
}: {
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  files: FileWithPreview[];
}) => {
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejections: FileRejection[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { url: URL.createObjectURL(file) }),
      );

      setFiles((prev) => [...prev, ...newFiles]);
      setFileRejections(rejections);
    },
    [],
  );

  // Cleanup previews when component unmounts or files change
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    };
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
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
    maxSize: 5 * 1024 * 1024, // 5MB limit
    maxFiles: 15,
  });

  return (
    <div
      {...getRootProps()}
      className={` h-full flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300  hover:border-blue-500"}`}
    >
      <div>
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
                    "File is too large (max 5MB)"}
                  {error.code === "file-invalid-type" &&
                    "Unsupported file type"}
                  {error.code === "too-many-files" && "Too many files (max 15)"}
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Upload;
