import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, Rating } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#F29279',
	},
});

export default function PopUpData({ person }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(person);
	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}
			>
				<Avatar alt='Remy Sharp' src={person.user.img} />
				<Typography component='legend' textAlign={'end'}>
					{person.user.name} {person.user.lastname}
				</Typography>
			</Box>

			<Typography component='legend'>${person.price}</Typography>
			<StyledRating
				precision={0.5}
				name='read-only'
				value={person.rating}
				readOnly
				size='small'
				icon={<PetsOutlinedIcon fontSize='inherit' />}
				emptyIcon={<PetsOutlinedIcon fontSize='inherit' />}
			/>
			{/* <Link
				// to={`/caretaker/${person.user.id}`}
				style={{ textDecoration: 'none' }}
			> */}
			<Button
				onClick={() => {
					navigate(`/caretaker/${person.user.id}`);
					// dispatch(getCaretakerDetails(person.user.id));
				}}
			>
				Detail
			</Button>
			{/* </Link> */}
		</Box>
	);
}
