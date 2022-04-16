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
// import { Label } from '@mui/icons-material';
// import { useParams } from 'react-router-dom';

const initialForm = {
	lat: -38.024157,
	lng: -57.53561,
	price: 10,
	size: '1',
	description: 'Hi Im John and I live in...',
	homeDescription: 'My house has a garden...',
	rating: 4,
};
export const CuidadorForm = () => {
	const [form, setForm] = useState(initialForm);
	const [isTouched, setIsTouched] = useState(false);
	const userId = 'ea7d4494-2170-457a-9aa7-52f90d2ced17';
	const dispatch = useDispatch();
	const handleInputChange = (e) => {
		if (
			e.target.name !== 'description' ||
			e.target.name !== 'homeDescription'
		) {
			setForm({
				...form,
				[e.target.name]: parseInt(e.target.value),
			});
		}
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const controlProps = (item) => ({
		checked: form.size === item,
		onChange: handleInputChange,
		value: item,
		name: 'size',
		inputprops: { 'aria-label': item },
	});
	const onSave = () => {
		dispatch(postCaretaker({ ...form, userId }));
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
				helperText={!form.description && isTouched && 'Tell us about yourself'}
				// error={!form.description && isTouched}
				value={form.description}
				onChange={handleInputChange}
				onBlur={() => setIsTouched(true)}
				name='description'
			/>

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
			/>

			<Typography>Put your Marker on the Map</Typography>
			<Box
				sx={{
					position: 'relative',
					maxWidth: '100%',
					height: '500px',
				}}
			>
				<Mapa formUse={true} setFormCoords={setForm} form={form} />
			</Box>

			<TextField
				fullWidth
				rows={4}
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='Nice neighborhood, with a small garden...'
				autoFocus
				multiline
				label='Home description'
				helperText={
					!form.homeDescription && isTouched && 'Tell us about your home'
				}
				// error={!form.description && isTouched}
				value={form.homeDescription}
				onChange={handleInputChange}
				onBlur={() => setIsTouched(true)}
				name='homeDescription'
			/>

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
