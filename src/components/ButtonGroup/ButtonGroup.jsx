import Button from '@mui/material/Button';
import { Box, ButtonGroup } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
import { SizeFilter } from '../MapFilters/SizeFilter';
import { PriceFilter } from '../MapFilters/PriceFilter';
import { RatingFilter } from '../MapFilters/RatingFilter';
import { useDispatch } from 'react-redux';
import { filterByPetSize } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

export const GroupSizesColors = () => {
	const [form, setForm] = useState({
		size: '0',
		price: [0, 10000],
		rating: 2.5,
	});
	const [clickState, setClickState] = useState({
		size: false,
		price: false,
		rating: false,
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFilterClick = () => {
		dispatch(filterByPetSize(form));
		navigate('/map');
	};
	const buttons = [
		<Button
			key='one'
			onClick={() => {
				setClickState({
					size: !clickState.size,
					price: false,
					rating: false,
				});
			}}
			sx={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}
		>
			Size
		</Button>,
		<Button
			key='two'
			onClick={() => {
				setClickState({
					size: false,
					price: !clickState.price,
					rating: false,
				});
			}}
		>
			Price
		</Button>,
		<Button
			key='three'
			onClick={() => {
				setClickState({
					size: false,
					price: false,
					rating: !clickState.rating,
				});
			}}
		>
			Rating
		</Button>,

		<Button
			// endIcon={<SearchOutlinedIcon sx={{ color: '#FEFBFA' }} />}
			onClick={handleFilterClick}
			sx={{
				textAlign: 'center',
				backgroundColor: '#F29278',
				borderTopRightRadius: '50px',
				borderBottomRightRadius: '50px',
				color: '#FEFBFA',
				'&:hover': {
					color: '#F29278',
				},
			}}
		>
			<SearchOutlinedIcon />
		</Button>,
	];

	const handleChange = (event) => {
		if (event.target.name === 'rating') {
			setForm({
				...form,
				[event.target.name]: Number(event.target.value),
			});
			return;
		}
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
		// setSelectedValue(event.target.value);
	};
	// console.log(form);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				'& > *': {
					m: 1,
				},
			}}
		>
			<ButtonGroup size='large' aria-label='large button group'>
				{buttons}
			</ButtonGroup>
			{clickState.size && (
				<SizeFilter handleChange={handleChange} form={form} />
			)}
			{clickState.price && (
				<PriceFilter handleChange={handleChange} form={form} />
			)}
			{clickState.rating && (
				<RatingFilter handleChange={handleChange} form={form} />
			)}
		</Box>
	);
};