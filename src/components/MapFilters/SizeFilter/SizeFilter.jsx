import { Box, Card, CardContent, Radio, Typography } from '@mui/material';
import React from 'react';

export const SizeFilter = ({ handleChange, form }) => {
	const controlProps = (item) => ({
		checked: form.size === item,
		onChange: handleChange,
		value: item,
		name: 'size',
		inputprops: { 'aria-label': item },
	});
	return (
		<Card
			sx={{
				minWidth: 275,
				height: 100,
			}}
		>
			<CardContent sx={{ textAlign: 'center' }}>
				<Typography variant='body1' sx={{ textAlign: 'center' }}>
					Choose your pet size: small, medium or big
				</Typography>
			</CardContent>

			<Box sx={{ textAlign: 'center' }}>
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
			</Box>
		</Card>
	);
};
