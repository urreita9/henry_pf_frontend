import { Image } from '@mui/icons-material';
import { Box, Button, Divider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../utils/redux/actions/userActions';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const [input, setInput] = useState({
        name: '',
        lastname: '',
        address: '',
        img: '',
    });

    const { id } = useParams();

    useEffect(() => {
        localStorage.setItem(
            'x-token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2YmIwZTRjMC0yY2NkLTQyZTktYTIxYS05MTBmOWFhYWFjMjkiLCJpYXQiOjE2NTAwNDM0MzcsImV4cCI6MTY1MDEyOTgzN30.OEmhxuOzx2UAK9Y0L_k8GhE9722w3-oVMLld1wvEb-U'
        );

        dispatch(getUser(id));
    }, []);

    useEffect(() => {
        if (user.length !== 0) {
            setInput({
                name: user.name,
                lastname: user.lastname,
                address: user.address,
                img: user.img,
            });
        }
    }, [user]);

    return (
        <Box
            border='1px solid'
            width='100vw'
            height='90vh'
            display={'flex'}
            justifyContent='center'
            alignItems={'center'}
        >
            <form action=''>
                <TextField disabled id='img' name='img' label='img' value={input.img} />
                <Button> Edit</Button>  
                <img src={input.img} width='100px' />
                <br />
                <br />
                <br />
                <TextField disabled id='name' name='name' label='Name' value={input.name} />
                <Button> Edit</Button>
                <br />
                <br />
                <br />
                <TextField disabled id='lastname' name='lastname' label='Lastname' value={input.lastname} />
                <Button> Edit</Button>
                <br />
                <br />
                <br />
                <TextField disabled id='address' name='address' label='Address' value={input.address} />
                <Button> Edit</Button>
                <br />
                <br />
                <br />
            </form>
        </Box>
    );
};

export default UserProfile;
