import { useEffect, useRef, useState } from 'react';
import { intervalToDuration, differenceInCalendarDays } from 'date-fns';

import {
	Box,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { setOperation } from '../../redux/actions/operationActions';

const TicketCard = ({ price, datesRange }) => {
	const timeLapse = intervalToDuration({
		start: new Date(datesRange[0].startDate),
		end: new Date(datesRange[0].endDate),
	}).days;

	const time = differenceInCalendarDays(
		new Date(datesRange[0].endDate),
		new Date(datesRange[0].startDate)
	);

	console.log(time);
	const { logged, user } = useSelector((state) => state.userReducer);
	const { caretakerProfile } = useSelector((state) => state.cuidadoresReducer);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const sum = price * time;
	const totalCheckout = sum + sum * 0.03;

	const handleOperationSubmit = async (
		buyerId,
		sellerId,
		price,
		datesRange,
		timeLapse
	) => {
		const response = await api.post('/operations', {
			buyerId,
			sellerId,
			price,
			datesRange,
			timeLapse,
		});

		// window.location.href = response.data.response.init_point;
	};
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
				{time !== 0 && datesRange[0].endDate && (
					<>
						<Typography sx={{ mb: 1, textAlign: 'end' }} color='text.secondary'>
							{datesRange[0].startDate.getDate()}/
							{datesRange[0].startDate.getMonth()}/
							{datesRange[0].startDate.getFullYear()} -
							{datesRange[0].endDate.getDate()}/
							{datesRange[0].endDate.getMonth()}/
							{datesRange[0].endDate.getFullYear()}
						</Typography>
						<Typography sx={{ mb: 1 }} color='text.secondary'>
							{time === 1
								? `$${price} x ${time} night`
								: `$${price} x ${time} nights`}
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
						onClick={() => {
							if (!logged) {
								navigate('/login');
								return;
							}
							handleOperationSubmit(
								user.id,
								caretakerProfile.id,
								price,
								datesRange,
								timeLapse
							);
						}}
						disabled={user.id === caretakerProfile.id ? true : false}
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
		<Box sx={{ width: '90%' }}>
			<Card variant='outlined'>
				<TicketCard price={price} datesRange={datesRange} />
			</Card>
		</Box>
	);
};
