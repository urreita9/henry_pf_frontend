import { useState } from 'react';
import {
	Box,
	Button,
	Radio,
	TextField,
	Typography,
	Input,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Mapa } from '../Map/Mapa';
import { useDispatch } from 'react-redux';
import { postCaretaker } from '../../redux/actions/actions';
import TestCloudinary from '../TestCloudinary';

const initialForm = {
	lat: null,
	lng: null,
	price: 10,
	size: '1',
	description: 'Hi Im John and I live in...',
	homeDescription: 'My house has a garden...',
};
const initialErrors = {
	lat: null,
	price: null,
	size: null,
	description: null,
	homeDescription: null,
};

export const CuidadorForm = () => {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState(initialErrors);
	const [isTouched, setIsTouched] = useState(false);
	const userId = 'ea7d4494-2170-457a-9aa7-52f90d2ced17';
	const dispatch = useDispatch();
	const handleInputChange = (e) => {
		// setErrors(initialErrors);
		setErrors({
			...errors,
			[e.target.name]: null,
		});
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		console.log(errors);
	};

	const controlProps = (item) => ({
		checked: form.size === item,
		onChange: handleInputChange,
		value: item,
		name: 'size',
		inputprops: { 'aria-label': item },
	});

	const onSave = () => {
		// Text Fields less than 70 characters
		if (form.description.length < 70) {
			console.log('description < 70');
			setErrors({
				...errors,
				description: 'Description must be at least 70 characters long',
			});
		} else if (!form.description.trim(' ').length) {
			setErrors({ ...errors, description: 'Description cant be empty' });
		} else if (Number(form.price) < 1) {
			console.log('price < 1');
			setErrors({
				...errors,
				price: 'Price must be greater than 0',
			});
		} else if (form.lat === null) {
			setErrors({
				...errors,
				lat: 'Must out marker in Map showing your aproximate location',
			});
		} else if (!form.homeDescription.trim(' ').length) {
			setErrors({
				...errors,
				homeDescription: 'Home description cant be empty',
			});
		} else if (form.homeDescription.length < 70) {
			setErrors({
				...errors,
				homeDescription: 'Home description must be at least 70 characters long',
			});
		} else {
			dispatch(postCaretaker({ ...form, userId }));
		}
	};

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			<Typography variant='h4'>
				Fill in this form and start recievieng pets!
			</Typography>
			<TextField
				fullWidth
				rows={4}
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='Hi! Im John. I am 25 years old and...'
				autoFocus
				multiline
				label='The users want to know you before they decide...'
				// helperText={errors.description && errors.description}
				error={errors.description && isTouched}
				value={form.description}
				onChange={handleInputChange}
				onBlur={() => setIsTouched(true)}
				name='description'
			/>
			{errors.description && (
				<Box color='red' textAlign='center'>
					{errors.description}
				</Box>
			)}

			<TestCloudinary />
			<div>
				<Typography>Pet size you are able to take care of</Typography>
				<Radio
					{...controlProps('0')}
					size='small'
					sx={{
						'& .MuiSvgIcon-root': {
							fontSize: 20,
							color: '#F29279',
						},
					}}
					label='Small'
				/>
				<Radio
					{...controlProps('1')}
					sx={{
						'& .MuiSvgIcon-root': {
							fontSize: 24,
							color: '#F29279',
						},
					}}
					label='Medium'
				/>
				<Radio
					{...controlProps('2')}
					sx={{
						'& .MuiSvgIcon-root': {
							fontSize: 30,
							color: '#F29279',
						},
					}}
					label='Big'
				/>
			</div>
			<Typography>$ Price per night </Typography>
			<Input
				value={form.price}
				type='number'
				onChange={handleInputChange}
				name='price'
				placeholder='$10'
				error={errors.price && errors.price}
			/>
			{errors.price && (
				<Box color='red' extAlign='center'>
					{errors.price}
				</Box>
			)}

			<Typography>Put your Marker on the Map</Typography>
			{errors.lat && (
				<Box color='red' textAlign='center'>
					{errors.lat}
				</Box>
			)}
			<Box
				sx={{
					position: 'relative',
					maxWidth: '100%',
					height: '500px',
				}}
			>
				<Mapa
					formUse={true}
					setFormCoords={setForm}
					form={form}
					setErrors={setErrors}
					errors={errors}
				/>
			</Box>

			<TextField
				fullWidth
				rows={4}
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='Nice neighborhood, with a small garden...'
				autoFocus
				multiline
				label='Tell us about your home...'
				// helperText={errors.homeDescription && errors.homeDescription}
				error={errors.homeDescription && isTouched}
				value={form.homeDescription}
				onChange={handleInputChange}
				onBlur={() => setIsTouched(true)}
				name='homeDescription'
			/>
			{errors.homeDescription && (
				<Box color='red' textAlign='center'>
					{errors.homeDescription}
				</Box>
			)}

			<Box display='flex' justifyContent='space-between'>
				<Button
					variant='text'
					onClick={() => {
						setForm(initialForm);
						setIsTouched(false);
					}}
				>
					Cancel
				</Button>
				<Button
					variant='contained'
					sx={{
						backgroundColor: '#F29279',
						color: 'white',
						borderColor: '#F29279',
					}}
					endIcon={<SaveOutlinedIcon />}
					onClick={onSave}
				>
					Save
				</Button>
			</Box>
		</Box>
	);
};
