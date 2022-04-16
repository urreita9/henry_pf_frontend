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
				boxShadow:
					'0px 3px 1px -2px red,0px 2px 2px 0px #F29279,0px 1px 5px 0px rgba(0,0,0,0.12)',
			}}
		>
			<CardContent sx={{ textAlign: 'center' }}>
				<Typography variant='body1' sx={{ textAlign: 'center' }}>
					Size
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
