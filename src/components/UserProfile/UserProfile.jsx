import React from 'react';
import { Avatar, Box, Card, CardContent, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { capitalize } from '../../utils/functions';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { grey } from '@mui/material/colors';

const UserProfile = () => {
    const user = useSelector((state) => state.userReducer.user);
    console.log(user)
    return (
        <Box sx={{ height: '100%' }}>
            <Paper elevation={5}>
                <Card sx={{ minWidth: '550px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                            <Avatar alt='UserImg' src={user.img} sx={{ width: 200, height: 200, border: '5px solid #F29278' }} />
                        </CardContent>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'flex-start'
                        }}>
    

                        <CardContent sx={{flex: '2 1 auto'}}>
                            <Typography variant='h4' sx={{fontWeight: 'bold'}}>{`${capitalize(user.name)} ${capitalize(user.lastname)}`}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant='h6' color={grey[600]} >{user.email}</Typography>
                        </CardContent>
                        <CardContent sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            
                                {user.address ? (
                                    <>
                                        <LocationOnOutlinedIcon color='primary'/> 
                                        <Typography variant="sbutitle1">
                                            {user.address}
                                        </Typography>
                                    </>
                                ): (
                                    <>
                                        <LocationOnOutlinedIcon sx={{color: '#666'}}/> 
                                        <Typography variant="sbutitle1" sx={{color: '#666'}}>
                                            Edit profile and add address
                                        </Typography>
                                    </>
                                ) }

                        </CardContent>

                        </Box>
                    </Box>
                </Card>
            </Paper>
        </Box>
    );
};

export default UserProfile;
