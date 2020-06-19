import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./styles.css";

interface Props{
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = (props) => {

  
  const [selectedFileUrl, setselectedFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; //como é sempre um único arquivo, apenas posição 0. Se fosse multiple o input, seria todo o array.

    const fileUrl = URL.createObjectURL(file);

    setselectedFileUrl(fileUrl);

    props.onFileUploaded(file);
  }, [props]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point Thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </div>
  );

  
};

export default Dropzone;
