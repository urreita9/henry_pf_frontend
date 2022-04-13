import { useState } from 'react';
import { Box, Button, Radio, TextField, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Mapa } from '../Map/Mapa';
// import { useParams } from 'react-router-dom';

const initialForm = {
	lat: 0,
	lng: 0,
	price: 0,
	size: 0,
	description: '',
};
export const CuidadorForm = () => {
	// const { id } = useParams();
	const [form, setForm] = useState(initialForm);
	const [isTouched, setIsTouched] = useState(false);
	// const [form, setForm] = useState({ ...initialForm, id });
	const handleInputChange = (e) => {
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
	console.log(form);

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			<Typography variant='h4'>
				Fill in this form and start recievieng pets!
			</Typography>
			<TextField
				fullWidth
				rows={4}
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='Description'
				autoFocus
				multiline
				label='Description'
				helperText={!form.description && isTouched && 'Tell us about yourself'}
				error={!form.description && isTouched}
				value={form.description}
				onChange={handleInputChange}
				onBlur={() => setIsTouched(true)}
				name='description'
			/>

			<div>
				<Typography>Size</Typography>
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
			<Typography>Put your Marker on the Map</Typography>
			<div
				style={{
					position: 'relative',
					maxWidth: '500px',
					height: '500px',
				}}
			>
				<Mapa formUse={true} setFormCoords={setForm} form={form} />
			</div>

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
					// onClick={onSave}
				>
					Save
				</Button>
			</Box>
		</Box>
	);
};
