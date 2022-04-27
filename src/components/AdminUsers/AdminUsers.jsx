import { Box, Card, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/adminActions';
import AdminFilter from '../AdminFilter/AdminFilter';
import AdminPagination from '../AdminPagination/AdminPagination';
import AdminUsersCard from '../AdminUsersCard/AdminUsersCard';
import { orderFunc, filterFunc, searchFunc, paginationFunc } from './functions';

const AdminUsers = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const users = useSelector((state) => state.adminReducer.users);
    const [filteredUsers, setfilteredUsers] = useState([]);
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState({
        caretaker: '',
        state: '',
        banned: '',
        role: '',
    });
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [items, setItems] = useState(0);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('uid');

    useEffect(() => {
        dispatch(getAllUsers(token));
    }, [user]);

    useEffect(() => {
        const searchedUsers = searchFunc(users, search);
        const filteredUsers = filterFunc(searchedUsers, filter);
        const ordenedUsers = orderFunc(filteredUsers, order);
        const paginatedUsers = paginationFunc(ordenedUsers, page, perPage);
        const floor = Math.floor(ordenedUsers.length / perPage);
        const real = ordenedUsers.length / perPage;

        if (floor === real) {
            setItems(real);
        } else if (floor === 0) {
            setItems(1);
        } else {
            setItems(floor + 1);
        }

        setfilteredUsers(paginatedUsers);
    }, [users, order, filter, search, page, perPage]);

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Paper sx={{ height: '60px', marginBottom: '10px' }}>
                <AdminFilter
                    order={order}
                    filter={filter}
                    search={search}
                    perPage={perPage}
                    setOrder={setOrder}
                    setFilter={setFilter}
                    setSearch={setSearch}
                    setPerPage={setPerPage}
                    setPage={setPage}
                />
            </Paper>
            <Paper sx={{ height: '60px', marginBottom: '10px' }}>
                <AdminPagination items={items} page={page} setPage={setPage} />
            </Paper>
            <Paper>
                <Typography variant='h5' color='primary'>
                    User list
                </Typography>
                <Card
                    sx={{ display: 'flex', flexDirection: 'row', marginBottom: '5px', justifyContent: 'space-between' }}
                >
                    <CardContent sx={{ width: '70%' }}>
                        <Grid container sx={{ width: '100%' }} alignItems='center'>
                            <Grid item width={'5%'}>
                                <Typography>Avatar</Typography>
                            </Grid>
                            <Grid item width={'10%'}>
                                <Typography>Name</Typography>
                            </Grid>
                            <Grid item width={'10%'}>
                                <Typography>Lastname</Typography>
                            </Grid>
                            <Grid item width={'20%'}>
                                <Typography>Email</Typography>
                            </Grid>
                            <Grid item width={'10%'}>
                                <Typography>Caretaker</Typography>
                            </Grid>
                            <Grid item width={'10%'}>
                                <Typography>State</Typography>
                            </Grid>
                            <Grid item width={'10%'}>
                                <Typography>Banned</Typography>
                            </Grid>
                            <Grid item width={'10%'}>
                                <Typography>Role</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ marginRight: '20px' }}>
                        <Typography>Actions</Typography>
                    </CardActions>
                </Card>
                {filteredUsers && filteredUsers.map((el) => <AdminUsersCard key={el.id} {...el} />)}
            </Paper>
        </Box>
    );
};

export default AdminUsers;
