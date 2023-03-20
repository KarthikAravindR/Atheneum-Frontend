import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  const { uploadimage } = props;
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      uploadimage({ src: fileReader.result, alt: "preview" });
    };
    fileReader.readAsDataURL(file);
  }, [file, uploadimage]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.jpeg,"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <button className="profileEditPicture" onClick={pickImageHandler}>
          <FontAwesomeIcon icon={faEdit} /> <span>&#60; 1MB</span>
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
