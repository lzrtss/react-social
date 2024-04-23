import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui';
import { FILE_UPLOADER } from '@/constants';

interface FileUploaderProps {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(() => mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [files],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center items-center bg-dark-4 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full">
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[480px] w-full rounded-lg object-cover object-top"
            />
          </div>
          <p className="w-full p-4 text-light-4 text-center small-regular border-t border-t-dark-4">
            {FILE_UPLOADER.LABEL}
          </p>
        </>
      ) : (
        <div className="p-7 h-80 lg:h-[480px] flex flex-col justify-center items-center">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={76}
            alt="upload files"
          />
          <div className="mb-2 mt-6 font-medium text-light-2">
            {FILE_UPLOADER.PLACEHOLDER}
          </div>
          <p className="mb-6 font-normal text-sm text-light-4">
            {FILE_UPLOADER.AVAILABLE_FORMATS}
          </p>

          <Button className="w-[120px] flex gap-2 bg-dark-4 px-5 text-light-1">
            {FILE_UPLOADER.SELECT_BUTTON_TEXT}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
