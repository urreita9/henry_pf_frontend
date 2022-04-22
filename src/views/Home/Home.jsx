import { Box, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCaretakers } from '../../redux/actions/actions';
import { ButtonMapFilter } from '../../components/MapFilters/ButtonFilter';
// import StepperModal from "../Stepper/Stepper";
import { FAQ } from '../../components/FAQ/FAQ';
import petsHome from '../../utils/petshome.jpg';
// import { style } from "@mui/system";

import { FAQ } from '../../components/FAQ/FAQ';
import petsHome from '../../utils/petshome.jpg';

export const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCaretakers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Container
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					height: '80vh',
					marginTop: '2rem',
				}}
			>
				<Paper
					elevation={3}
					sx={{
						position: 'absolute',
						left: '4rem',
						zIndex: '300',
						width: '40%',
						minHeight: '70%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderRadius: '10px',
						padding: '1.5rem',
					}}
				>
					<Typography
						variant='h4'
						component='h1'
						sx={{ textAlign: 'center', fontWeight: 'bold' }}
					>
						Find sitters for your pets
					</Typography>

					<ButtonMapFilter />
				</Paper>
				<Paper
					elevation={2}
					sx={{
						backgroundImage: `url(${petsHome})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						width: '80%',
						height: '100%',
						borderRadius: '10px',
					}}
				>
					{/* <StepperModal /> */}
					{/* <Typography variant="h2" sx={{ textAlign: "center" }}>
              Find the best place for your pet!
            </Typography> */}

					{/* <img src={petsHome} alt="" height={'100%'}  style={{borderRadius: '5px'}}/> */}
				</Paper>
			</Container>
			<Container>
				<FAQ />
			</Container>
		</>
	);
};
