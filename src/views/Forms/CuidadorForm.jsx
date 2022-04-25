import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import {
	Box,
	Button,
	Radio,
	TextField,
	Typography,
	Input,
	Card,
    CardActions,
    CardContent,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
// import { Mapa } from '../Map/Mapa';
import { useDispatch, useSelector } from 'react-redux';
import {
	editCaretaker,
	getUser,
	postCaretaker,
} from '../../redux/actions/actions';
import { ModalUi } from '../../components/Modal/ModalUi';
import UploadIcon from '@mui/icons-material/Upload';
import swal from 'sweetalert';
const initialForm = {
	description: '',
	images: '',
	size: '1',
	price: 10,
	lat: null,
	lng: null,
	rating: 3.5,

	homeDescription: '',
	//image:
	// 'https://karlaperezyt.com/wp-content/uploads/kui_system/telegram_profiles/2980022.jpg',
};
const initialErrors = {
	description: '',
	images: '',
	size: '',
	price: '',
	lat: '',
	homeDescription: '',
};
const initialPoint = {
	lng: -58.381592,
	lat: -34.603722,
	zoom: 5,
};

const congrats = () => {
	return swal({
		title: '¡Felicidades!',
		text: '¡Has creado un cuidador exitosamente!',
		icon: 'success',
		button: 'disabled',
	});
};

export const CuidadorForm = ({ editUser = false }) => {
	const { user, logged } = useSelector((state) => state.userReducer);
	console.log('editRuser', editUser);
	const MAX_LENGTH = 3;
	const [form, setForm] = useState(
		editUser
			? {
					description: user.caretaker.description,
					images: user.caretaker.images.map((image) => image.img),
					size: user.caretaker.size,
					price: user.caretaker.price,
					lat: user.caretaker.lat,
					lng: user.caretaker.lng,
					rating: user.caretaker.size.rating,
					homeDescription: user.caretaker.homeDescription,
			  }
			: initialForm
	);
	const [errors, setErrors] = useState(initialErrors);
	const [isTouched, setIsTouched] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	// const [caretakerLocation, setCaretakerLocation] = useState(false);
	const [loading, setLoading] = useState(false);

	const [fileInputState, setFileInputState] = useState('');

	const { caretakerProfile } = useSelector((state) => state.cuidadoresReducer);

	const token = localStorage.getItem('token');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (!logged) {
			navigate('/');
		}
		return () => {
			setForm(initialForm);
		};
	}, [logged]);

	useEffect(() => {
		if (caretakerProfile.caretaker?.images.length) {
			setLoading(false);
			dispatch(getUser(token, user.id));
		}
	}, [caretakerProfile.caretaker?.images]);

	// console.log('FORM USER CT', user);

	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});

		switch (e.target.name) {
			case 'description':
				if (e.target.value.length < 10) {
					setErrors({
						...errors,
						description: 'Description must be at least 70 characters long',
					});
				} else {
					setErrors({
						...errors,
						description: '',
					});
				}
				break;
			case 'price':
				if (e.target.value <= 0) {
					setErrors({
						...errors,
						price: 'Price must be greater than 0',
					});
				} else {
					setErrors({
						...errors,
						price: '',
					});
				}
				break;
			case 'homeDescription':
				if (e.target.value.length < 10) {
					setErrors({
						...errors,
						homeDescription:
							'Home description must be at least 70 characters long',
					});
				} else {
					setErrors({
						...errors,
						homeDescription: '',
					});
				}
				break;
			default:
				break;
		}
	};

	const controlProps = (item) => ({
		checked: form.size === item,
		onChange: handleInputChange,
		value: item,
		name: 'size',
		inputprops: { 'aria-label': item },
	});
	const createCaretaker = () => {
		dispatch(postCaretaker({ ...form, userId: user.id }));
		setLoading(true);
		setModalOpen(true);
		congrats();
	};

	const updateCaretaker = () => {
		console.log(' FORM FORM', form);
		const caretaker = { ...form };
		dispatch(editCaretaker(user.id, caretaker));
		setLoading(true);
		setModalOpen(true);
		congrats();
	};

	const handleFileInputChange = (e) => {
		//const file = e.target.files[0];
		const files = Array.from(e.target.files);
		previewFile(files);
	};

	const previewFile = async (files) => {
		//reader.readAsDataURL(file);
		const filesURL = files.map((file) => {
			const reader = new FileReader();
			return new Promise((resolve) => {
				reader.onloadend = (e) => {
					resolve(e.target.result);
				};
				reader.readAsDataURL(file);
			});
		});
		if (filesURL.length !== 3) {
			setErrors({
				...errors,
				images: 'Must select three images',
			});
		} else {
			setErrors({
				...errors,
				images: '',
			});
		}
		setForm({
			...form,
			images: await Promise.all(filesURL),
		});
	};

	const LocationFinderDummy = () => {
		const map = useMapEvents({
			click(e) {
				setForm({ ...form, lat: e.latlng.lat, lng: e.latlng.lng });
				setErrors({ ...errors, lat: '' });
			},
		});
		return null;
	};

	return (
		<>
			{modalOpen && (
				<ModalUi
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					id={caretakerProfile.id}
				/>
			)}
			<Box sx={{ width: '100%', marginBottom: 2, paddingX: '2rem' }} elevation={5}>
				<Typography variant='h3' sx={{fontWeight: 'bold'}}>
					{editUser
						? 'Edit your caretaker form'
						: 'Fill in this form and start recievieng pets!'}
				</Typography>
				<Card elevation={5} sx={{
					padding: '0.9rem 1.2rem',
					margin: '1.2rem 0'
					
				}}>

					<Typography variant='h6' >
						About me
					</Typography>
					<TextField
						fullWidth
						rows={4}
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder='Hi! Im John. I am 25 years old and...'
						multiline
						label='The users want to know you before they decide...'
						// helperText={errors.description && errors.description}
						autoFocus
						//error={errors.description && isTouched}
						onChange={handleInputChange}
						//error={errors.description}
						value={form.description}
						//onBlur={() => setIsTouched(true)}
						name='description'
					/>

				{errors.description && (
					<Box color='red' textAlign='center'>
						{errors.description}
					</Box>
				)}
				</Card>

				<Card elevation={5} sx={{
					padding: '0.9rem 1.2rem',
					margin: '1.2rem 0'
				}}>
					<Typography variant='h6' >
					Choose 3 pictures that describes your home
					</Typography>
					<CardContent>

					<label htmlFor='file'>
					<input
						type='file'
						name='image'
						onChange={handleFileInputChange}
						value={fileInputState}
						multiple
					/>
					</label>
					{form.images && (
						<>
							<Button color='error' variant='contained' onClick={() => setForm({ ...form, images: '' })}>
								Delete
							</Button>
						</>
					)}
					<Box sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>

					{form.images &&
						form.images?.map((image) => (
							<img
							key={image}
								src={image}
								alt='img'
								style={{ width: '30%', height: '30%' }}
							/>
							))}
					</Box>

				{errors.images && (
					<Box color='red' textAlign='center'>
						{errors.images}
					</Box>
				)}
								</CardContent>
								<CardContent>

								
								<TextField
					fullWidth
					rows={4}
					sx={{ marginTop: 2, marginBottom: 1 }}
					placeholder='Nice neighborhood, with a small garden...'
					//autoFocus
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
				</CardContent>
				</Card>

				<Card elevation={5} sx={{
					width: '100%',
					padding: '0.9rem 1.2rem',
					margin: '1.2rem 0',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center'
				}}>
					<CardContent>

			
					<Typography variant='subtitle1'>Pet size you are able to take care of</Typography>
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
							</CardContent>

				<CardContent>


				<Typography variant='subtitle1' >$ Price per night </Typography>
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
								</CardContent>
				</Card>
				
				<Card elevation={5} sx={{
					width: '100%',
					padding: '0.9rem 1.2rem',
					margin: '1.2rem 0',
				}}
					>


				<Typography variant='h6'>Put your Marker on the Map</Typography>
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
					<MapContainer
						center={[initialPoint.lat, initialPoint.lng]}
						zoom={initialPoint.zoom}
						scrollWheelZoom={true}
						style={{ height: '100%' }}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						<LocationFinderDummy />
						{form.lat !== null && (
							<Marker position={[form.lat, form.lng]} anchor='center' />
						)}
					</MapContainer>
				</Box>

				</Card>

				<Box display='flex' justifyContent='flex-end' sx={{gap: '20px'}}>
					<Button
						variant='contained'
						color='error'
						onClick={() => {
							setForm(initialForm);
							setIsTouched(false);
						}}
					>
						Cancel
					</Button>
					{
						//console.log(Object.values(errors).every((v) => v === ''))
						Object.values(form).every((v) => v !== '') &&
						Object.values(errors).every((v) => v === '') ? (
							<Button
								variant='contained'
								sx={{
									backgroundColor: '#F29279',
									color: 'white',
									borderColor: '#F29279',
								}}
								endIcon={<SaveOutlinedIcon />}
								onClick={() => {
									if (editUser) {
										updateCaretaker();
										return;
									}
									createCaretaker();
								}}
							>
								Save
							</Button>
						) : (
							<Button
								variant='contained'
								sx={{
									backgroundColor: '#9b9b9b',
									color: 'white',
									borderColor: '#F29279',
								}}
								endIcon={<SaveOutlinedIcon />}
								//onClick={onSave}
								disable
							>
								Save
							</Button>
						)
					}
				</Box>
			</Box>
		</>
	);
};
