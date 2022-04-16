import Radio from '@mui/material/Radio';
import { Typography, Stack, Slider, Box, Rating, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPetSize, getCaretakers } from '../../redux/actions/actions';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#F29279',
	},
	'& .MuiRating-iconHover': {
		color: '#f38d73',
	},
});
export const MapFilters = () => {
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		size: '0',
		price: [0, 100],
		rating: 2.5,
	});

	useEffect(() => {
		dispatch(getCaretakers());
	}, []);
	// useEffect(() => {
	// 	console.log('cuidadores', cuidadores);
	// }, [cuidadores]);
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

	const controlProps = (item) => ({
		checked: form.size === item,
		onChange: handleChange,
		value: item,
		name: 'size',
		inputprops: { 'aria-label': item },
	});
	const valuetext = (value) => {
		return `$${value}`;
	};
	const handleFilterClick = () => {
		dispatch(filterByPetSize(form));
	};
	// console.log(form);
	return (
		<div>
			<form>
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
				<Box sx={{ width: 200 }}>
					<Typography>Price</Typography>
					<Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
						<Slider
							getAriaLabel={() => 'Price range'}
							getAriaValueText={valuetext}
							value={form.price}
							onChange={handleChange}
							name='price'
							valueLabelDisplay='on'
							sx={{
								color: '#F29279',
							}}
						/>
					</Stack>
				</Box>
				<Box sx={{ width: 200 }}>
					<Typography>Rating</Typography>
					<Stack spacing={1}>
						<StyledRating
							name='rating'
							defaultValue={3}
							precision={0.5}
							value={form.rating}
							onChange={handleChange}
							icon={<PetsOutlinedIcon fontSize='inherit' />}
							emptyIcon={<PetsOutlinedIcon fontSize='inherit' />}
						/>
					</Stack>
				</Box>
				<Link to='/map' style={{ textDecoration: 'none' }}>
					<Button
						variant='contained'
						sx={{
							backgroundColor: '#F29279',
						}}
						onClick={handleFilterClick}
					>
						Filter
					</Button>
				</Link>
			</form>
		</div>
	);
};
