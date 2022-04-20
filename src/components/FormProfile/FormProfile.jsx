import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../redux/actions/actions';
import { capitalize, checkPassword } from '../../utils/functions';

const FormProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const [form, setForm] = useState({
        name: '',
        lastname: '',
        address: '',
        img: '',
    });

    const [passForm, setPassForm] = useState({
        actual: '',
        new: '',
        repeat: '',
    });

    const [viewPass, setViewPass] = useState({
        actual: false,
        new: false,
        repeat: false,
    });

    const [edit, setEdit] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('uid');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!edit) {
            setEdit(!edit); //ACA SE EDITA
        } else {
            setEdit(!edit); //ACA SE SUBMITEA

            dispatch(editUser(token, id, form));
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (!editPassword) {
            setEditPassword(!editPassword); //ACA SE EDITA
        } else {
            // setEditPassword(!editPassword); //ACA SE SUBMITEA
            const resp = await checkPassword(token, id, passForm.actual);

            if (resp) {
                dispatch(editUser(token, id, { password: passForm.new }));
                setEditPassword(!editPassword);
                setPassForm({
                    actual: '',
                    new: '',
                    repeat: '',
                });
                setViewPass({
                    actual: false,
                    new: false,
                    repeat: false,
                });
            } else {
            }
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = (e) => {
        setPassForm({
            ...passForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeView = (name = '') => {
        return (e) => {
            setViewPass({
                ...viewPass,
                [name]: !viewPass[name],
            });
        };
    };

    const handleCancelPassword = (e) => {
        setPassForm({
            actual: '',
            new: '',
            repeat: '',
        });
        setViewPass({
            actual: false,
            new: false,
            repeat: false,
        });
        setEditPassword(false);
    };

    const handleCancel = (e) => {
        setPassForm({
            name: capitalize(user.name) || '',
            lastname: capitalize(user.lastname) || '',
            address: capitalize(user.address) || '',
            img: user.img || '',
        });
        setEdit(false);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setForm({
            name: capitalize(user.name) || '',
            lastname: capitalize(user.lastname) || '',
            address: capitalize(user.address) || '',
            img: user.img || '',
        });
    }, [user]);

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Box component={'form'} onSubmit={handleSubmit}>
                    {edit ? (
                        <Box
                            sx={{
                                height: '60vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-start',
                            }}
                        >
                            <TextField
                                id='Img'
                                name='img'
                                variant='filled'
                                label='Img'
                                value={form.img}
                                onChange={handleChange}
                            />
                            {!user.name ? (
                                <TextField
                                    id='Name'
                                    name='name'
                                    variant='filled'
                                    label='Name'
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <TextField
                                    disabled
                                    id='Name'
                                    name='name'
                                    variant='filled'
                                    label='Name'
                                    value={form.name}
                                />
                            )}
                            {!user.lastname ? (
                                <TextField
                                    id='Lastname'
                                    name='lastname'
                                    variant='filled'
                                    label='Lastname'
                                    value={form.lastname}
                                    onChange={handleChange}
                                />
                            ) : (
                                <TextField
                                    disabled
                                    id='Lastname'
                                    name='lastname'
                                    variant='filled'
                                    label='Lastname'
                                    value={form.lastname}
                                />
                            )}

                            <TextField
                                id='Address'
                                name='address'
                                variant='filled'
                                label='Address'
                                value={form.address}
                                onChange={handleChange}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                height: '60vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-start',
                            }}
                        >
                            <TextField disabled id='Img' name='img' variant='filled' label='Img' value={form.img} />
                            <TextField disabled id='Name' name='name' variant='filled' label='Name' value={form.name} />

                            <TextField
                                disabled
                                id='Lastname'
                                name='lastname'
                                variant='filled'
                                label='Lastname'
                                value={form.lastname}
                            />

                            <TextField
                                disabled
                                id='Address'
                                name='address'
                                variant='filled'
                                label='Address'
                                value={form.address}
                            />
                        </Box>
                    )}
                    {!edit ? (
                        <Box>
                            <Button variant='contained' type='submit'>
                                Edit Profile
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                width: '15vw',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Button variant='contained' type='submit'>
                                Save
                            </Button>
                            <Button variant='contained' color='error' onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    )}
                </Box>
                <img src={user?.img} alt='' width={'100px'} sx={{ alignSelf: 'flex-start' }} />
            </Box>
            <Box>
                <Box component={'form'} onSubmit={handleSubmitPassword}>
                    {!editPassword ? (
                        <Box>
                            <Button variant='contained' color='error' onClick={handleSubmitPassword}>
                                Edit Password
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
                                <InputLabel htmlFor='actual'>Actual Password</InputLabel>
                                <FilledInput
                                    id='actual'
                                    name='actual'
                                    type={viewPass.actual ? 'text' : 'password'}
                                    value={passForm.actual}
                                    onChange={handleChangePassword}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleChangeView('actual')}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                            >
                                                {viewPass.actual ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label='Actual Password'
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
                                <InputLabel htmlFor='new'>New Password</InputLabel>
                                <FilledInput
                                    id='new'
                                    name='new'
                                    type={viewPass.new ? 'text' : 'password'}
                                    value={passForm.new}
                                    onChange={handleChangePassword}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleChangeView('new')}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                            >
                                                {viewPass.new ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label='New Password'
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
                                <InputLabel htmlFor='repeat'>Repeat Password</InputLabel>
                                <FilledInput
                                    id='repeat'
                                    name='repeat'
                                    type={viewPass.repeat ? 'text' : 'password'}
                                    value={passForm.repeat}
                                    onChange={handleChangePassword}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleChangeView('repeat')}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                            >
                                                {viewPass.repeat ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label='Repeat Password'
                                />
                            </FormControl>

                            {/* <TextField
                                id='new'
                                name='new'
                                variant='filled'
                                type='password'
                                label='New Password'
                                value={passForm.new}
                                onChange={handleChangePassword}
                            /> */}
                            {/* <TextField
                                id='repeat'
                                name='repeat'
                                variant='filled'
                                type='password'
                                label='Repeat Password'
                                value={passForm.repeat}
                                onChange={handleChangePassword}
                            /> */}
                            <Button variant='contained' color='error' onClick={handleSubmitPassword}>
                                Save
                            </Button>
                            <Button variant='contained' color='error' onClick={handleCancelPassword}>
                                Cancel
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default FormProfile;
