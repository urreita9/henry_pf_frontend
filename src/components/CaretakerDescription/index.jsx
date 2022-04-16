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
import { useState } from 'react';
import { ProfileImageList } from '../ImageList/ProfileImageList';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#F29278',
  },
});

const CaretakerDescription = ({ name, description, rating, img, price }) => {
  const [datesRange, setDatesRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  // const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <Grid item xs={12}>
        <ProfileImageList />
      </Grid>

      {/* <Grid item xs={12} sm={4} md={6} display='flex'>
				<Avatar
					alt='Remy Sharp'
					src='https://images.pexels.com/photos/5859488/pexels-photo-5859488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
					sx={{ width: 250, height: 250 }}
				/>
			</Grid> */}
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        sx={{ marginTop: '20px', padding: '20px' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' component='h2'>
            {name}
          </Typography>
          <Avatar
            alt='Remy Sharp'
            src='https://images.pexels.com/photos/5859488/pexels-photo-5859488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            // sx={{ width: 250, height: 250 }}
            sx={{ marginRight: '20px' }}
          />
        </Box>

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
        <Typography variant='p'>
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
          dolorem explicabo, fuga consequuntur est voluptate? Aut praesentium,
          reiciendis dignissimos at consequatur facere aliquam perspiciatis
          adipisci dolore odit impedit exercitationem in? Asperiores quam
          impedit in earum natus laudantium laborum, quod officiis magni
          consectetur. Ut error soluta fugiat obcaecati architecto pariatur cum.{' '}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
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
