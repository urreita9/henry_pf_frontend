import { Box, Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export const Operation = () => {
	const { operation } = useSelector((state) => state.operationsReducer);
	const { id, price, timeLapse, datesRange } = operation;

	// console.log('Operation date start', datesRange[0].startDate);
	return (
		<Container>
			<Box>Operation # {id}</Box>
			<Box>User Name </Box>
			<Box>Caretaker Name </Box>
			<Box>Price ${price}</Box>
			<Box>Nights: {timeLapse}</Box>
			{/* <Box>
				Date Range {datesRange[0].startDate} - {datesRange[0].endDate}
			</Box> */}
			<Box>Passed or not passed</Box>
		</Container>
	);
};
