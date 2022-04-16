import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../redux/actions/actions';

const TestCloudinary = () => {
  const MAX_LENGTH = 3;
  const dispatch = useDispatch();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    //const files = Array.from(e.target.files)
    previewFile(file);
    //previewFile(files)
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    //const filesURL = files.map(file => reader.readAsDataURL(file))
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
    // reader.onloadend=() =>{
    //   setPreviewSource(reader.result);
    // }
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    //uploadImage(previewSource);
    // dispatch(
    //   postUser({
    //     email: 'tatata@mail.com',
    //     password: '123456',
    //     name: 'pepe',
    //     lastname: 'pepo',
    //     address: '45 68',
    //     img: previewSource,
    //   })
    // );
  };

  // const uploadImage = (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  // };

  const uploadMultipleFiles = (e) => {
    if (Array.from(e.target.files).length > MAX_LENGTH) {
      e.preventDefault();
      alert(`Cannot upload files more than ${MAX_LENGTH}`);
      return;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input
          type='file'
          name='image'
          onChange={handleFileInputChange}
          value={fileInputState}
          //multiple
        />
        <button type='submit'>Upload</button>
      </form>
      {previewSource && (
        <img src={previewSource} alt='img' style={{ height: '300px' }} />
      )}
    </div>
  );
};

export default TestCloudinary;
