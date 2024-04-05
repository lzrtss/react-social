import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

import { convertFileToUrl } from '@/lib/utils';

interface ProfileUploaderProps {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="flex justify-center items-center gap-4 cursor-pointer">
        <img
          src={fileUrl || '/assets/icons/user.svg'}
          alt="profile image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 text-sm md:text-[16px] md:font-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
