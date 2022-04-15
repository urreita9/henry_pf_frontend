import * as React from 'react';
import intervalToDuration from 'date-fns/intervalToDuration';

import {
	Grid,
	Box,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
} from '@mui/material';

const TicketCard = ({ price, datesRange }) => {
	const timeLapse = intervalToDuration({
		start: new Date(datesRange[0].startDate),
		end: new Date(datesRange[0].endDate),
	}).days;
	console.log(timeLapse);

	const sum = price * timeLapse;
	const totalCheckout = sum + sum * 0.03;
	return (
		<>
			<CardContent>
				<Typography
					sx={{ fontSize: 14, textAlign: 'end' }}
					color='text.secondary'
					gutterBottom
				>
					${price} per night
				</Typography>
				<Typography variant='h5' component='div'>
					Checkout
				</Typography>
				{timeLapse !== 0 && (
					<>
						<Typography sx={{ mb: 1 }} color='text.secondary'>
							${price} x {timeLapse} nights
						</Typography>
						<Typography sx={{ mb: 1 }} color='text.secondary'>
							2% Cleaning fee
						</Typography>
						<Typography sx={{ mb: 1 }} color='text.secondary'>
							1% PeTrip fee
						</Typography>
					</>
				)}
				{/* <Typography sx={{ mb: 1.5 }} color='text.secondary'>
					${price} x {timeLapse} nights
				</Typography> */}
				<Typography variant='h6' sx={{ textAlign: 'end' }}>
					Total ${totalCheckout}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
				<Box>
					{' '}
					<Button
						variant='contained'
						size='medium'
						sx={{ backgroundColor: '#F29278' }}
					>
						Checkout
					</Button>
				</Box>
			</CardActions>
		</>
	);
};
export const Ticket = ({ price, datesRange }) => {
	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant='outlined'>
				<TicketCard price={price} datesRange={datesRange} />
			</Card>
		</Box>
	);
};
