import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
	Avatar,
	Box,
	Button,
	CardActionArea,
	CardActions,
	Rating,
} from '@mui/material';

export default function PopUp({ person }) {
	const { name, price, img, stars } = person;
	return (
		<Box>
			<Avatar alt='Remy Sharp' src={img} />
			<Typography component='legend'>{name}</Typography>
			<Typography component='legend'>${price}</Typography>
			<Rating
				precision={0.5}
				name='read-only'
				value={stars}
				readOnly
				size='small'
			/>
		</Box>
	);
}
