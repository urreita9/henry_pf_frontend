import {
	Button,
	Card,
	CardActions,
	CardContent,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { DescriptionCard } from '../DescriptionCard/DescriptionCard';

export const CaretakerUserProfile = () => {
	const { user } = useSelector((state) => state.userReducer);
	console.log(user);
	return (
		<Container sx={{ margin: '0 auto' }}>
			<Grid container spacing={3} sx={{ maxWidth: '70vw' }}>
				{user.caretaker?.images.map((img, i) => (
					<Grid
						item
						key={img + i}
						xs={12}
						sm={6}
						md={4}
						sx={{ maxWidth: '300px', maxHeight: '300px' }}
					>
						<img
							src={img.img}
							alt=''
							style={{ height: '100%', width: '100%', borderRadius: '10px' }}
						/>
					</Grid>
				))}
			</Grid>
			<Typography variant='h3'>
				{user.name} {user.lastname}
			</Typography>
			<DescriptionCard
				type={'personal'}
				lastname={user.lastname}
				description={user.caretaker.description}
			/>
			<DescriptionCard
				type={'home'}
				lastname={user.lastname}
				description={user.caretaker.homeDescription}
			/>
		</Container>
	);
};
