import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { useDispatch } from 'react-redux';
import { LoginAction } from '../../redux/actions/actions';
import api from '../../axios';
import { checkLoginForm } from './functions';
import { DisabledByDefaultTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
import RegisterForm from '../RegisterForm/RegisterForm';
import swal from 'sweetalert';
import { format } from 'date-fns';
import { GoogleLogin } from 'react-google-login';
const initLogForm = {
    email: '',
    password: '',
    remember: false,
};

const initErrors = {
    state: false,
    email: '',
    password: '',
};

export const LoginForm = () => {
    const dispatch = useDispatch();

    // const [check, setCheck] = useState(null); que no expire el token
    const [logForm, setLogForm] = useState(initLogForm);
    const [errors, setErrors] = useState(initErrors);
    const [viewPass, setViewPass] = useState({ password: false, repeat: false });
    const [msg, setMsg] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const changeHandler = (event) => {
        setLogForm({
            ...logForm,
            [event.target.name]: event.target.value,
        });
        setErrors({
            ...errors,
            [event.target.name]: '',
        });
        setMsg('');
    };

    const handleSwitch = (e) => {
        setLogForm({
            ...logForm,
            [e.target.name]: e.target.checked,
        });
        setMsg('');
    };

    const handleChangeView = (name = '') => {
        return (e) => {
            setViewPass({
                ...viewPass,
                [name]: !viewPass[name],
            });
        };
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loggedIn = () => {
        return swal({
            title: 'Login succesful!',
            text: 'You will be redirected',
            icon: 'success',
            button: false,
            timer: 1000,
        });
    };

    const responseGoogle = async (resp) => {
        const data = {
            name: resp.Ru.wY,
            lastname: resp.Ru.LW,
            email: resp.Ru.Hv,
            img: resp.Ru.NN,
        };
        const loginorcreate = await api.post('/auth/googlelogin', data);

        localStorage.setItem('token', loginorcreate.data.token);
        localStorage.setItem('uid', loginorcreate.data.id);
        dispatch(LoginAction());
        loggedIn();
    };

    const logError = () => {
        return swal({
            title: 'Login failed!',
            text: 'Check your credentials',
            icon: 'error',
            button: 'OK!',
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const check = checkLoginForm(logForm);
        setErrors((prevState) => {
            return { ...prevState, ...check };
        });

        if (errors.state) {
            return logError();
        }

        if (!check.state) {
            api.post('/auth/login', { ...logForm })
                .then((res) => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('uid', res.data.id);
                    dispatch(LoginAction());
                    loggedIn();
                })
                .catch((err) => {
                    setMsg('Wrong email and/or password');
                });
        }
    };

    const paperStyle = {
        padding: 20,
        // height: "80vh",
        width: 350,
        margin: '20px auto',
        borderRadius: '15px',
    };

    const avatarStyle = {};
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box style={style}>
                    <RegisterForm />
                </Box>
            </Modal>
            <Box>
                <Paper elevation={10} style={paperStyle}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar style={avatarStyle}>
                            <PetsIcon color='primary' />
                        </Avatar>
                        <h2>Sign in</h2>
                    </Box>
                    <TextField
                        name='email'
                        label='Email*'
                        placeholder='Enter email..'
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={changeHandler}
                        margin='normal'
                    />
                    <FormControl fullWidth margin='normal'>
                        <InputLabel htmlFor='password'>Password*</InputLabel>
                        <OutlinedInput
                            label='password*'
                            id='password'
                            name='password'
                            type={viewPass.password ? 'text' : 'password'}
                            value={logForm.password}
                            onChange={changeHandler}
                            error={!!errors.password}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleChangeView('password')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {viewPass.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error>{!!errors.password && errors.password}</FormHelperText>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={logForm.remember}
                                onChange={handleSwitch}
                                name='remember'
                                color='primary'
                            />
                        }
                        label='Remember me'
                    />
                    <Typography variant='subtitle1' color='error'>
                        {!!msg && msg}
                    </Typography>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        style={{ margin: '8px 0' }}
                        onClick={handleSubmit}
                    >
                        Sign in
                    </Button>
                    <GoogleLogin
                        clientId='221755505254-ckd8nt7ukp091rrvgp9gnuns7fq18rpk.apps.googleusercontent.com'
                        buttonText='Login with Google'
                        onSuccess={responseGoogle}
                        onFailure={() => {
                            console.log('No papa');
                        }}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Button onClick={handleOpen}>DON'T HAVE AN ACCOUNT?</Button>
                </Paper>
            </Box>
        </>
    );
};
