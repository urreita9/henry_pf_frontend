import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from '../../utils/functions';

const UserProfile = () => {
    const user = useSelector((state) => state.userReducer.user);

    return (
        <Box sx={{ border: '1px solid', height: '100%' }}>
            <Card sx={{ width: '50vw' }}>
                <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <CardContent>
                        <Avatar alt='UserImg' src={user.img} sx={{ width: 200, height: 200 }} />
                    </CardContent>
                    <CardContent>
                        <Typography>{`${capitalize(user.name)} ${capitalize(user.lastname)}`}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>{user.address}</Typography>
                    </CardContent>
                </Box>
            </Card>
            <Card sx={{ width: '50vw' }}>
                <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <CardContent>
                        <Avatar alt='UserImg' src={user.img} sx={{ width: 200, height: 200 }} />
                    </CardContent>
                    <CardContent>
                        <Typography>{`${capitalize(user.name)} ${capitalize(user.lastname)}`}</Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>{user.address}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
};

export default UserProfile;
