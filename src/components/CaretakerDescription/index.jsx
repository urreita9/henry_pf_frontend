import {
	CardMedia,
	Grid,
	Rating,
	Typography,
	Box,
	Avatar,
} from '@mui/material';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { styled } from '@mui/material/styles';
import { Calendar } from '../Calendar/Calendar';
import { Ticket } from '../Ticket/Ticket';
import { useState } from 'react';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#F29278',
	},
});

const CaretakerDescription = ({ name, description, rating, img, price }) => {
	const [datesRange, setDatesRange] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	]);
	// const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
	return (
		<>
			<Grid item xs={12} sm={4} md={6} display='flex'>
				<Avatar
					alt='Remy Sharp'
					src='https://images.pexels.com/photos/5859488/pexels-photo-5859488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
					sx={{ width: 250, height: 250 }}
				/>
			</Grid>
			<Grid item xs={12} sm={8} md={6}>
				<Typography variant='h4' component='h2'>
					{name}
				</Typography>
				<Typography variant='p'> {description} </Typography>
				<br></br>
				<StyledRating
					name='half-rating-read'
					value={rating || 0}
					precision={0.5}
					readOnly
					icon={<PetsOutlinedIcon fontSize='inherit' />}
					emptyIcon={<PetsOutlinedIcon fontSize='inherit' />}
				/>
			</Grid>

			{/* <Grid item xs={6} textAlign='center'>
				<StyledRating
					name='half-rating-read'
					value={rating || 0}
					precision={0.5}
					readOnly
					icon={<PetsOutlinedIcon fontSize='inherit' />}
					emptyIcon={<PetsOutlinedIcon fontSize='inherit' />}
				/>
			</Grid> */}
			<Grid item xs={6} sx={{ marginTop: '20px' }}>
				<Calendar datesRange={datesRange} setDatesRange={setDatesRange} />
			</Grid>
			<Grid item xs={6} sx={{ marginTop: '20px' }}>
				<Ticket price={price} datesRange={datesRange} />
			</Grid>
		</>
	);
};

export default CaretakerDescription;
