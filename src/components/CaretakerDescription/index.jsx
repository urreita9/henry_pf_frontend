import {
	CardMedia,
	Grid,
	Rating,
	Typography,
	Box,
	Avatar,
	List,
	ListItem,
} from '@mui/material';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { styled } from '@mui/material/styles';
import { Calendar } from '../Calendar/Calendar';
import { Ticket } from '../Ticket/Ticket';
import { useEffect, useState } from 'react';
import { ProfileImageList } from '../ImageList/ProfileImageList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#F29278',
	},
});

const CaretakerDescription = ({
	name,
	description,
	homeDescription,
	rating,
	images,
	price,
}) => {
	const [datesRange, setDatesRange] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);

	const namesArray = [
		'John',
		'Paul',
		'George',
		'Ringo',
		'Anna',
		'Sophie',
		'Laura',
		'Veronica',
		'Claude',
		'Mick',
		'Keith',
		'Ron',
	];
	const mockedName = namesArray[Math.floor(Math.random() * namesArray.length)];
	// console.log('desc images', images);
	// const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
	return (
		<>
			{images?.length && (
				<Grid item xs={12}>
					<ProfileImageList images={images} />
				</Grid>
			)}
			{/* {showImageGallery && <ImageGallery items={imagesForGallery} />} */}

			<Grid
				item
				xs={12}
				// sm={8}
				md={6}
				sx={{ marginTop: '20px', padding: '20px' }}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					// width={300}
				>
					<Typography variant='h4' component='h2'>
						{mockedName}
						{/* Juan */}
					</Typography>
					<Avatar
						alt='Remy Sharp'
						src='https://images.pexels.com/photos/5859488/pexels-photo-5859488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
						// sx={{ width: 250, height: 250 }}
						sx={{ marginRight: '20px' }}
					/>
				</Box>

				<Box>
					<Typography variant='body1' style={{ overflowWrap: 'break-word' }}>
						{description}
					</Typography>{' '}
					<br></br>
					<StyledRating
						name='half-rating-read'
						value={rating || 0}
						precision={0.5}
						readOnly
						icon={<PetsOutlinedIcon fontSize='inherit' />}
						emptyIcon={<PetsOutlinedIcon fontSize='inherit' />}
					/>
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography variant='h4' component='h2'>
						My home
					</Typography>
				</Box>

				<List>
					<ListItem>
						<Typography sx={{ fontSize: 14 }} color='text.secondary'>
							Garden
						</Typography>
					</ListItem>
					<ListItem>
						<Typography sx={{ fontSize: 14 }} color='text.secondary'>
							Security
						</Typography>
					</ListItem>
					<ListItem>
						<Typography sx={{ fontSize: 14 }} color='text.secondary'>
							Lots of toys
						</Typography>
					</ListItem>
				</List>
				<Typography variant='body2' style={{ overflowWrap: 'break-word' }}>
					{homeDescription}
				</Typography>
			</Grid>

			<Grid
				item
				xs={12}
				// sm={6}
				md={6}
				sx={{
					marginTop: '20px',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Calendar datesRange={datesRange} setDatesRange={setDatesRange} />
				<Ticket price={price} datesRange={datesRange} />
			</Grid>

			{/* <Grid item xs={12} sm={6} md={6} sx={{ marginTop: '20px' }}></Grid> */}
		</>
	);
};

export default CaretakerDescription;
