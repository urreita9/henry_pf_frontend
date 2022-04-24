import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';

export const DescriptionCard = ({ type, lastname, description }) => {
	return (
		<Card sx={{ minWidth: 275, maxWidth: '70vw', marginTop: '40px' }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color='primary' gutterBottom>
					Your {type} description
				</Typography>
				<Typography
					variant='h5'
					component='div'
					sx={{ textDecoration: 'underline', textDecorationColor: '#F29278' }}
				>
					Description
				</Typography>

				<Typography
					variant='body2'
					sx={{ wordWrap: 'break-word', marginTop: '20px' }}
				>
					{description}
				</Typography>
			</CardContent>
			{/* <CardActions>
				<Button size='small'>Learn More</Button>
			</CardActions> */}
		</Card>
	);
};
