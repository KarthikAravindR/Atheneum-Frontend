import React, { useRef, useState, useEffect } from 'react';

import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState();
  // const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  const {updateBlog} = props
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // setPreviewUrl(fileReader.result);
      updateBlog({src:fileReader.result, alt: "preview"});
    };
    fileReader.readAsDataURL(file);
  }, [file,updateBlog]);

  const pickedHandler = event => {
    let pickedFile;
    // let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      // fileIsValid = true;
    } else {
      setIsValid(false);
      // fileIsValid = false;
    }
    
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg,.html"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        {/* <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div> */}
        <button className="add-image-button" onClick={pickImageHandler}>
          + Add Image +
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
