import {
	Card,
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
