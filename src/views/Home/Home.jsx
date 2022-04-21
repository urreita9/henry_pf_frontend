import { Box, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCaretakers } from '../../redux/actions/actions';
import { GroupSizesColors } from '../../components/ButtonGroup/ButtonGroup';

import { FAQ } from '../../components/FAQ/FAQ';
import petsHome from '../../utils/petshome.jpg';

export const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCaretakers());
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
						minHeight: '45%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'flex-start',
						borderRadius: '10px',
						padding: '1.5rem',
					}}
				>
					<Box>
						<Typography
							variant='h4'
							component='h1'
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Find sitters for your pets
						</Typography>
						<GroupSizesColors />
					</Box>
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
