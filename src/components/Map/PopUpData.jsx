import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, Rating } from '@mui/material';

import { Link } from 'react-router-dom';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#F29279',
	},
});

export default function PopUpData({ person }) {
	const { id, name, price, img, rating } = person;

	return (
		<Box>
			<Avatar alt='Remy Sharp' src={img} />
			<Typography component='legend'>{name}</Typography>
			<Typography component='legend'>${price}</Typography>
			<StyledRating
				precision={0.5}
				name='read-only'
				value={rating}
				readOnly
				size='small'
				icon={<PetsOutlinedIcon fontSize='inherit' />}
			/>
			<Link to={`/caretaker/${id}`} style={{ textDecoration: 'none' }}>
				<Button>Detail</Button>
			</Link>
		</Box>
	);
}
