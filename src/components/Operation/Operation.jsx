import {
	Avatar,
	Box,
	Button,
	Card,
	Grid,
	Paper,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { captureOperation } from '../../redux/actions/operationActions';
import {
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import { capitalize } from '../../utils/functions';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export const Operation = () => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const PayerID = searchParams.get('PayerID');
	//console.log(token);

	const { operation } = useSelector((state) => state.operationsReducer);
	const location = useLocation();
	const navigate = useNavigate();

	const { id, status } = operation;
	// const { email_address, name: given_name, name: surname } = operation.payer;
	useEffect(() => {
		if (location.pathname.includes('/newOperation')) {
			dispatch(captureOperation(token, PayerID));
		}
	}, [dispatch]);

	const date = operation.operation && new Date(operation.operation.createdAt);
	const userId = localStorage.getItem('uid');
	const statusColor = (status) => {
		switch (status) {
			case 'APPROVED':
				return '#1ED760';

			case 'CANCELED':
				return '#FF1346';
			case 'COMPLETED':
				return '#8D49D2';

			case 'CREATED':
				return '#FFE84D';
			default:
				break;
		}
	};

	// console.log(operation);

	return (
		<>
			{userId === operation?.operation.caretakerId ? (
				<>
					<Typography
						variant='h6'
						sx={{ marginTop: '20px', textAlign: 'center' }}
					>
						Operation #{operation.operation.operationId}{' '}
					</Typography>
					<Grid
						container
						spacing={2}
						sx={{ width: '90%', maxWidth: '600px', margin: '30px auto' }}
					>
						<Grid item xs={12} style={{ paddingLeft: '0' }}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									Client data
								</Typography>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-around',
										width: '60%',
									}}
								>
									<Box>
										<Avatar
											src={operation.caretaker.img}
											sx={{
												width: 100,
												height: 100,
												border: '5px solid #F29278',
												marginRight: '20px',
											}}
										/>

										<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
											{capitalize(operation.caretaker.name)}{' '}
											{capitalize(operation.caretaker.lastname)}
										</Typography>

										<Typography variant='body'>
											{operation.caretaker.email}
										</Typography>
									</Box>
									<Box>
										<Avatar
											src={operation.pet.img}
											sx={{
												width: 100,
												height: 100,
												border: '5px solid #F29278',
												marginRight: '20px',
											}}
										/>

										<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
											{capitalize(operation.pet.name)}
										</Typography>

										<Typography variant='body'>
											{operation.pet.size} ({operation.pet.race})
										</Typography>
									</Box>
								</Box>
							</Card>
						</Grid>
						<Grid item xs={12} style={{ paddingLeft: '0' }}>
							<Card sx={{ textAlign: 'center' }}>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									Operation data
								</Typography>
								{/* <Typography>
									Operation #{operation.operation.operationId}{' '}
								</Typography> */}
								<Typography>
									Date: {date.getDate()}/{date.getMonth() + 1}/
									{date.getFullYear()}
								</Typography>
								<Typography>
									Duration: {operation.operation.timeLapse} nights
								</Typography>
								<Typography>Total: ${operation.operation.price}</Typography>
								<Typography
									sx={{ color: `${statusColor(operation.operation.status)}` }}
								>
									Status: {operation.operation.status}
								</Typography>
							</Card>
						</Grid>
						<Grid item xs={12} style={{ paddingLeft: '0' }}>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Typography
									sx={{ fontSize: 14 }}
									color='text.secondary'
									gutterBottom
								>
									Your data
								</Typography>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-around',
										width: '75%',
									}}
								>
									<Box
										sx={{
											marginLeft: '20px',
										}}
									>
										<Avatar
											src={operation.user.img}
											sx={{
												width: 100,
												height: 100,
												border: '5px solid #F29278',
												marginRight: '20px',
											}}
										/>

										<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
											{capitalize(operation.user.name)}{' '}
											{capitalize(operation.user.lastname)}
										</Typography>

										<Typography variant='body'>
											{operation.user.email}
										</Typography>
									</Box>
								</Box>
							</Card>
						</Grid>
					</Grid>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							margin: '0 auto',
						}}
					>
						<Button
							onClick={() => {
								navigate('/profile/7');
							}}
						>
							Back to History
						</Button>
					</Box>
				</>
			) : (
				operation?.user && (
					<>
						<Typography
							variant='h6'
							sx={{ marginTop: '20px', textAlign: 'center' }}
						>
							Operation #{operation.operation.operationId}{' '}
						</Typography>
						<Grid
							container
							spacing={2}
							sx={{ width: '90%', maxWidth: '600px', margin: '30px auto' }}
						>
							<Grid item xs={12} style={{ paddingLeft: '0' }}>
								<Card
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography
										sx={{ fontSize: 14 }}
										color='text.secondary'
										gutterBottom
									>
										Your data
									</Typography>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-around',
											width: '60%',
										}}
									>
										<Box>
											<Avatar
												src={operation.user.img}
												sx={{
													width: 100,
													height: 100,
													border: '5px solid #F29278',
													marginRight: '20px',
												}}
											/>

											<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
												{capitalize(operation.user.name)}{' '}
												{capitalize(operation.user.lastname)}
											</Typography>

											<Typography variant='body'>
												{operation.user.email}
											</Typography>
										</Box>
										<Box>
											<Avatar
												src={operation.pet.img}
												sx={{
													width: 100,
													height: 100,
													border: '5px solid #F29278',
													marginRight: '20px',
												}}
											/>

											<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
												{capitalize(operation.pet.name)}
											</Typography>

											<Typography variant='body'>
												{operation.pet.size} ({operation.pet.race})
											</Typography>
										</Box>
									</Box>
								</Card>
							</Grid>
							<Grid item xs={12} style={{ paddingLeft: '0' }}>
								<Card sx={{ textAlign: 'center' }}>
									<Typography
										sx={{ fontSize: 14 }}
										color='text.secondary'
										gutterBottom
									>
										Operation data
									</Typography>
									{/* <Typography>
									Operation #{operation.operation.operationId}{' '}
								</Typography> */}
									<Typography>
										Date: {date.getDate()}/{date.getMonth() + 1}/
										{date.getFullYear()}
									</Typography>
									<Typography>
										Duration: {operation.operation.timeLapse} nights
									</Typography>
									<Typography>Total: ${operation.operation.price}</Typography>
									<Typography
										sx={{ color: `${statusColor(operation.operation.status)}` }}
									>
										Status: {operation.operation.status}
									</Typography>
								</Card>
							</Grid>
							<Grid item xs={12} style={{ paddingLeft: '0' }}>
								<Card
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography
										sx={{ fontSize: 14 }}
										color='text.secondary'
										gutterBottom
									>
										Caretaker data
									</Typography>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-around',
											width: '75%',
										}}
									>
										<Box
											sx={{
												marginLeft: '20px',
											}}
										>
											<Typography variant='body2' sx={{ fontWeight: 'bold' }}>
												{capitalize(operation.caretaker.name)}{' '}
												{capitalize(operation.caretaker.lastname)}
											</Typography>

											<Typography variant='body'>
												{operation.caretaker.email}
											</Typography>
										</Box>
										<Box>
											<Avatar
												src={operation.caretaker.img}
												sx={{
													width: 100,
													height: 100,
													border: '5px solid #F29278',
												}}
											/>
										</Box>
									</Box>
								</Card>
							</Grid>
						</Grid>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								margin: '0 auto',
							}}
						>
							<Button
								onClick={() => {
									navigate('/profile/6');
								}}
								color='primary'
								variant='outlined'
							>
								Back to History
							</Button>
						</Box>
					</>
				)
			)}
			{}
		</>
	);
};
