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
import { capitalize } from '../../utils/functions';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery'
import * as Carousel from "../../components/Carousel";

export const CaretakerUserProfile = () => {
	const { user } = useSelector((state) => state.userReducer);
	console.log(user);
	return (
		<Container sx={{ margin: '0 auto' }}>
			<Card elevation={5} sx={{
					padding: '0.9rem 1.2rem',
					margin: '1.2rem 0'
					
				}}>
			<CardContent>

			<Typography variant='h5' >
				Home images
			</Typography>
			</CardContent>
			<CardContent sx={{
				margin: 'auto'
			}}>

			<Gallery>

				<Carousel.Component options={{
					  type: 'carousel',
					  perView: 2,
				}}>
				{user.caretaker?.images.map((img, i) => {
					return (
						<Carousel.Slide key={i}>
								<Item
									original={img.img}
									thumbnail={img.img}
									width="1024"
									height="768"
									>
									{({ ref, open }) => (
										<img ref={ref} onClick={open} src={img.img} width="150px" height="150px" />
									)}
								</Item>
								</Carousel.Slide>
					)
				})}
				</Carousel.Component>
			{/* <Grid container spacing={3} sx={{ maxWidth: '70vw' }}>
				{user.caretaker?.images.map((img, i) => (
					<Grid
						item
						key={img + i}
						xs={12}
						sm={6}
						md={4}

						gridTemplateColumns='240px 171px 171px'
						gridTemplateRows= '114px 114px'
						sx={{ maxWidth: '300px', maxHeight: '300px' }}
					>
						<Item
						original={img.img}
						thumbnail={img.img}
						width="1024"
						height="768"
						>
							{({ ref, open }) => (
								<img
									ref={ref}
									onClick={open}
									src={img.img}
								/>
							)}
						
						</Item>
					</Grid>
				))}
			</Grid> */}
			</Gallery>
			</CardContent>
			</Card>
			<Card elevation={5} sx={{
					padding: '0.9rem 1.2rem',
					margin: '1.2rem 0'
					
				}}>
			<CardContent>
				<Typography variant='h3'>
				{`${capitalize(user.name)} ${capitalize(user.lastname)}`}
				</Typography>
			</CardContent>
			<DescriptionCard
				type={'personal'}
				lastname={user.lastname}
				description={user.caretaker.description}
				sx={{marginTop: '20px'}}
			/>
			<DescriptionCard
				type={'home'}
				lastname={user.lastname}
				description={user.caretaker.homeDescription}
			/>
			</Card>
		</Container>
	);
};
