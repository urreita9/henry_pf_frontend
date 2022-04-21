import { Box, Card, Container, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Operation = ({
	price,
	id,
	timeLapse,
	userId,
	caretakerId,
	status,
}) => {
	const navigate = useNavigate();
	return (
		<Grid item xs={12}>
			<Card>
				<Box>Operation # {id}</Box>
				<Box>user # {userId}</Box>
				<Box>caretaker # {caretakerId}</Box>
				<Box>User Name </Box>
				<Box>Caretaker Name </Box>
				<Box>Price ${price}</Box>
				<Box>Nights: {timeLapse}</Box>
				{/* <Box>
				Date Range {datesRange[0].startDate} - {datesRange[0].endDate}
			</Box> */}
				<Box>Status: {status}</Box>
			</Card>
		</Grid>
	);
};
