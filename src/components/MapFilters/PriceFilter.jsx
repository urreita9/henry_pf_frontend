import {
	Box,
	Card,
	CardActions,
	CardContent,
	Slider,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';

export const PriceFilter = ({ handleChange, form }) => {
	const valuetext = (value) => {
		return `$${value}`;
	};
	return (
		<Card
			sx={{
				minWidth: 275,
				height: 100,
				boxShadow:
					'0px 3px 1px -2px red,0px 2px 2px 0px #F29279,0px 1px 5px 0px rgba(0,0,0,0.12)',
			}}
		>
			<CardContent sx={{ textAlign: 'center' }}>
				<Typography
					variant='body1'
					sx={{ textAlign: 'center', fontWeight: '700px' }}
				>
					Choose your price range
				</Typography>
			</CardContent>
			{/* <CardActions> */}
			<Stack
				spacing={2}
				direction='row'
				sx={{ mb: 1, width: '80%', margin: 'auto' }}
				alignItems='center'
			>
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
			{/* </CardActions> */}
		</Card>
	);
};
