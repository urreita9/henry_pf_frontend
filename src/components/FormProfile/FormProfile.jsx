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
import PassForm from '../PassForm/PassForm';

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

    const [errors, setErrors] = useState({
        state: false,
        name: '',
        lastname: '',
        address: '',
        img: '',
    });

    const [passErrors, setPassErrors] = useState({
        state: false,
        name: '',
        lastname: '',
        address: '',
        img: '',
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCancel = (e) => {
        setForm({
            name: capitalize(user.name) || '',
            lastname: capitalize(user.lastname) || '',
            address: capitalize(user.address) || '',
            img: user.img || '',
        });
        setEdit(false);
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
                            disabled={!edit}
                            variant='filled'
                            label='Img'
                            value={form.img}
                            onChange={handleChange}
                        />
                        <TextField
                            id='Name'
                            name='name'
                            disabled={!!user.name || !edit}
                            variant='filled'
                            label='Name'
                            value={form.name}
                            onChange={handleChange}
                        />
                        <TextField
                            id='Lastname'
                            name='lastname'
                            disabled={!!user.lastname || !edit}
                            variant='filled'
                            label='Lastname'
                            value={form.lastname}
                            onChange={handleChange}
                        />
                        <TextField
                            id='Address'
                            disabled={!edit}
                            name='address'
                            variant='filled'
                            label='Address'
                            value={form.address}
                            onChange={handleChange}
                        />
                    </Box>

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
            <PassForm />
        </Box>
    );
};

export default FormProfile;
