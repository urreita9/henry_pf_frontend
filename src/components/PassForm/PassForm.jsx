import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, setPassword } from '../../redux/actions/actions';
import { capitalize, checkFormPass, checkFormSetPass, checkPassword } from '../../utils/functions';

const initPassForm = {
    actual: '',
    new: '',
    repeat: '',
};

const initErrorsPass = {
    state: false,
    actual: '',
    new: '',
    repeat: '',
};

const initViews = {
    actual: false,
    new: false,
    repeat: false,
};

const PassForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const [passForm, setPassForm] = useState(initPassForm);
    const [errorsPass, setErrorsPass] = useState(initErrorsPass);
    const [viewPass, setViewPass] = useState(initViews);
    const [editPassword, setEditPassword] = useState(false);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('uid');

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (!editPassword) {
            setEditPassword(!editPassword); //ACA SE EDITA
        } else {
            // setEditPassword(!editPassword); //ACA SE SUBMITEA
            const check = checkFormPass(passForm);
            setErrorsPass((prevState) => {
                return { ...prevState, ...check };
            });

            if (!check.state) {
                const resp = await checkPassword(token, id, passForm.actual);
                if (resp) {
                    dispatch(editUser(token, id, { password: passForm.new }));
                    setEditPassword(!editPassword);
                    setPassForm(initPassForm);
                    setViewPass(initViews);
                } else {
                    setErrorsPass({
                        ...errorsPass,
                        actual: 'Contraseña erronea',
                    });
                }
            }
        }
    };

    const handleSubmitSetPassword = async (e) => {
        e.preventDefault();
        if (!editPassword) {
            setEditPassword(!editPassword); //ACA SE EDITA
        } else {
            // setEditPassword(!editPassword); //ACA SE SUBMITEA
            const check = checkFormSetPass(passForm);
            setErrorsPass((prevState) => {
                return { ...prevState, ...check };
            });

            if (!check.state) {
                dispatch(setPassword(token, id, { password: passForm.new }));
                setEditPassword(!editPassword);
                setPassForm(initPassForm);
                setViewPass(initViews);
            }
        }
    };

    const handleChangePassword = (e) => {
        setPassForm({
            ...passForm,
            [e.target.name]: e.target.value,
        });
        setErrorsPass({
            ...errorsPass,
            [e.target.name]: '',
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
        setPassForm(initPassForm);
        setViewPass(initViews);
        setEditPassword(false);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{ height: '100%', width: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            component={'form'}
            onSubmit={handleSubmitPassword}
        >
            {!editPassword ? (
                <Box
                    sx={{
                        height: '60vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    {user.google && !user.passwordsetted ? (
                        <Button variant='contained' color='primary' onClick={handleSubmitSetPassword}>
                            Set Password
                        </Button>
                    ) : (
                        <Button variant='contained' color='primary' onClick={handleSubmitPassword}>
                            Edit Password
                        </Button>
                    )}
                </Box>
            ) : (
                <Box
                    sx={{
                        height: '60vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    {user.google && !user.passwordsetted ? (
                        <Box>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                                <InputLabel htmlFor='new'>New Password</InputLabel>
                                <OutlinedInput
                                    id='new'
                                    name='new'
                                    type={viewPass.new ? 'text' : 'password'}
                                    value={passForm.new}
                                    error={!!errorsPass.new}
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
                                <FormHelperText error>{!!errorsPass.new && errorsPass.new}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                                <InputLabel htmlFor='repeat'>Repeat Password</InputLabel>
                                <OutlinedInput
                                    id='repeat'
                                    name='repeat'
                                    type={viewPass.repeat ? 'text' : 'password'}
                                    value={passForm.repeat}
                                    error={!!errorsPass.repeat}
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
                                <FormHelperText error>{!!errorsPass.repeat && errorsPass.repeat}</FormHelperText>
                            </FormControl>
                            <Box>
                                <Button variant='contained' color='error' onClick={handleSubmitSetPassword}>
                                    Save
                                </Button>
                                <Button variant='contained' color='error' onClick={handleCancelPassword}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                                <InputLabel htmlFor='actual'>Actual Password</InputLabel>
                                <OutlinedInput
                                    id='actual'
                                    name='actual'
                                    type={viewPass.actual ? 'text' : 'password'}
                                    value={passForm.actual}
                                    onChange={handleChangePassword}
                                    error={!!errorsPass.actual}
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
                                    label='password'
                                />
                                <FormHelperText error>{!!errorsPass.actual && errorsPass.actual}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                                <InputLabel htmlFor='new'>New Password</InputLabel>
                                <OutlinedInput
                                    id='new'
                                    name='new'
                                    type={viewPass.new ? 'text' : 'password'}
                                    value={passForm.new}
                                    error={!!errorsPass.new}
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
                                <FormHelperText error>{!!errorsPass.new && errorsPass.new}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '25ch' }}>
                                <InputLabel htmlFor='repeat'>Repeat Password</InputLabel>
                                <OutlinedInput
                                    id='repeat'
                                    name='repeat'
                                    type={viewPass.repeat ? 'text' : 'password'}
                                    value={passForm.repeat}
                                    error={!!errorsPass.repeat}
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
                                <FormHelperText error>{!!errorsPass.repeat && errorsPass.repeat}</FormHelperText>
                            </FormControl>
                            <Box>
                                <Button variant='contained' color='error' onClick={handleSubmitPassword}>
                                    Save
                                </Button>
                                <Button variant='contained' color='error' onClick={handleCancelPassword}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default PassForm;
