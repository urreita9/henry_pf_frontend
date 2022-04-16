import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../redux/actions/actions';

const TestCloudinary = () => {
	const dispatch = useDispatch();
	const [fileInputState, setFileInputState] = useState('');
	const [selectedFile, setSelectedFile] = useState('');
	const [previewSource, setPreviewSource] = useState('');

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
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

	return (
		<div>
			<form onSubmit={handleSubmitFile}>
				<input
					type='file'
					name='image'
					onChange={handleFileInputChange}
					value={fileInputState}
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
