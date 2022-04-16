import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCaretakerDetails } from '../../redux/actions/actions';
import Questions from '../Questions';
import CaretakerDescription from '../CaretakerDescription';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';

const CaretakerProfile = () => {
	const { id } = useParams();
	const {caretakerProfile} = useSelector((state) => state.cuidadoresReducer);
	const dispatch = useDispatch();
	const { questions } = caretakerProfile;

	useEffect(() => {
		dispatch(getCaretakerDetails(id));
	}, [dispatch]);

	return (
		<Container
			style={{
				marginTop: '30px',
				maxWidth: '1200px',
			}}
		>
			<Grid container>
				<CaretakerDescription
					{...caretakerProfile}
					{...caretakerProfile.caretaker}
				/>
			</Grid>

			<Grid
				container

				// style={{
				// 	display: 'flex',
				// 	flexDirection: 'row',
				// 	gap: 200,
				// }}
			>
				<Questions questions={questions} />

				{/* <Grid item>
					<Typography variant='h4'>Calendario</Typography>
				</Grid> */}
			</Grid>
		</Container>
	);
};

export default CaretakerProfile;
