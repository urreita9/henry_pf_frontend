import { Avatar, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { banUser, toAdmin, toUser, unBanUser } from '../../redux/actions/adminActions';

const AdminUsersCard = ({ name, lastname, email, id, caretaker, state, banned, img, role }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    const user = useSelector((state) => state.userReducer.user);
    const [actions, setActions] = useState(false);
    const [hierarchy, setHierarchy] = useState(true);
    const [level, setLevel] = useState(true);

    const handleActions = () => {
        setActions(!actions);
    };

    const handleBan = () => {
        dispatch(banUser(token, id));
    };

    const handleUnBan = () => {
        dispatch(unBanUser(token, id));
    };

    const handleToAdmin = () => {
        dispatch(toAdmin(token, id));
    };

    const handleToUser = () => {
        dispatch(toUser(token, id));
    };

    useEffect(() => {
        if (user.role === 'ADMIN' && role === 'ADMIN') {
            setHierarchy(false);
        }
        if (user.role === 'ADMIN' && role === 'SUPER_ADMIN') {
            setHierarchy(false);
        }
        if (user.role === 'SUPER_ADMIN' && role === 'SUPER_ADMIN') {
            setHierarchy(false);
        }
        if (user.role === 'SUPER_ADMIN' && role === 'ADMIN') {
            setHierarchy(true);
        }
        if (user.role === 'ADMIN' && role === 'USER') {
            setLevel(false);
        }
    }, [user]);

    return (
        <Card sx={{ display: 'flex', flexDirection: 'row', marginBottom: '5px', justifyContent: 'space-between' }}>
            <CardContent sx={{ width: '70%' }}>
                <Grid container sx={{ width: '100%' }} alignItems='center'>
                    <Grid item width={'5%'}>
                        <Avatar src={img} />
                    </Grid>
                    <Grid item width={'10%'}>
                        <Typography>{name}</Typography>
                    </Grid>
                    <Grid item width={'10%'}>
                        <Typography>{lastname}</Typography>
                    </Grid>
                    <Grid item width={'20%'}>
                        <Typography>{email}</Typography>
                    </Grid>
                    <Grid item width={'10%'}>
                        <Typography>{caretaker ? 'Yes' : 'No'}</Typography>
                    </Grid>
                    <Grid item width={'10%'}>
                        <Typography>{state ? 'Active' : 'Inactive'}</Typography>
                    </Grid>
                    <Grid item width={'10%'}>
                        <Typography>{banned ? 'Yes' : 'No'}</Typography>
                    </Grid>
                    <Grid item width={'10%'}>
                        <Typography>{role}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            {!actions ? (
                <CardActions>
                    <Button disabled={!hierarchy} variant='contained' onClick={handleActions}>
                        Actions
                    </Button>
                </CardActions>
            ) : (
                <CardActions>
                    {level ? (
                        <CardActions>
                            {role === 'ADMIN' ? (
                                <Button variant='contained' onClick={handleToUser} color='error'>
                                    To User
                                </Button>
                            ) : (
                                <Button variant='contained' onClick={handleToAdmin} color='success'>
                                    To Admin
                                </Button>
                            )}
                            {banned ? (
                                <Button variant='contained' onClick={handleUnBan} color='success'>
                                    Unban
                                </Button>
                            ) : (
                                <Button variant='contained' onClick={handleBan} color='error'>
                                    Ban
                                </Button>
                            )}
                            <Button variant='contained' onClick={handleActions}>
                                Cancel
                            </Button>
                        </CardActions>
                    ) : (
                        <CardActions>
                            {banned ? (
                                <Button variant='contained' onClick={handleUnBan} color='success'>
                                    Unban
                                </Button>
                            ) : (
                                <Button variant='contained' onClick={handleBan} color='error'>
                                    Ban
                                </Button>
                            )}
                            <Button variant='contained' onClick={handleActions}>
                                Cancel
                            </Button>
                        </CardActions>
                    )}
                </CardActions>
            )}
        </Card>
    );
};

export default AdminUsersCard;
