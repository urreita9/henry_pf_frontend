import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import FilterBar from '../../components/FilterBar/FilterBar';
import { getCaretakers } from '../../redux/actions/actions';
import { GroupSizesColors } from '../ButtonGroup/ButtonGroup';

export const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCaretakers());
	}, []);
	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					margin: '0 auto',
				}}
			>
				{/* <Box style={{ width: '70%', height: '500px' }}>
				<Mapa />
			</div> */}
				<GroupSizesColors />
				{/* <FilterBar /> */}
				{/* <MapFilters /> */}
			</Box>
			<Box
				sx={{
					backgroundImage: `url(https://media.discordapp.net/attachments/943293732390850604/964687920890007632/Pngtreecontinuous_line_drawing_of_dog_5332973.png?width=716&height=335)`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '90%',
					height: '500px',
					margin: '10px auto',
					borderRadius: '10px',
					textAlign: 'center',
				}}
			>
				{/* <Typography
					variant='h2'
					component='h3'
					width='500px'
					color='success'
					sx={{ margin: '0 auto', fontWeight: '600' }}
				>
					Find the perfect home for your pets while you are away
				</Typography> */}
			</Box>
		</Container>
	);
};
