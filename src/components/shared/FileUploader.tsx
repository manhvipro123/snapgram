import { useState, useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center flex-col rounded-xl cursor-pointer bg-dark-2"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top"
            />
          </div>
          <p className="text-light-4 text-center small-regular w-full p-4 border-t border-t-dark-4;">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="flex-center flex-col p-7 h-80 lg:h-[612px]">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="text-base mb-2 mt-6 text-light-2">Drag photo here</h3>

          <p className="text-sm mb-6 text-light-4">SVG, PNG, JPG</p>
          <Button className="h-12 bg-dark-4 px-5 text-light-1 flex gap-2">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
