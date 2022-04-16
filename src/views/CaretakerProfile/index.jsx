import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanCaretaker,
	getCaretakerDetails,
} from '../../redux/actions/actions';
import Questions from '../../components/Questions/index';
import CaretakerDescription from '../../components/CaretakerDescription/index';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';

const CaretakerProfile = () => {
	const { id } = useParams();
	const {caretakerProfile} = useSelector((state) => state.cuidadoresReducer);
	const dispatch = useDispatch();
	const { questions } = caretakerProfile;

	useEffect(() => {
		dispatch(getCaretakerDetails(id));

		return () => {
			dispatch(cleanCaretaker());
		};
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
