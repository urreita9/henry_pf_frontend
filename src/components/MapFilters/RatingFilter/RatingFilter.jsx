import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { styled } from '@mui/material/styles';
import { Box, Card, Rating, Stack, Typography } from '@mui/material';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#F29279',
	},
	'& .MuiRating-iconHover': {
		color: '#f38d73',
	},
});

export const RatingFilter = ({ handleChange, form }) => {
	return (
		<Card
			sx={{
				minWidth: 275,
				height: 100,
				boxShadow:
					'0px 3px 1px -2px red,0px 2px 2px 0px #F29279,0px 1px 5px 0px rgba(0,0,0,0.12)',
			}}
		>
			<Typography textAlign='center' variant='h4'>
				Rating
			</Typography>
			<Box spacing={1} sx={{ textAlign: 'center', marginTop: '20px' }}>
				<StyledRating
					name='rating'
					defaultValue={3}
					precision={0.5}
					value={form.rating}
					onChange={handleChange}
					icon={<PetsOutlinedIcon fontSize='inherit' />}
					emptyIcon={<PetsOutlinedIcon fontSize='inherit' />}
				/>
			</Box>
		</Card>
	);
};
