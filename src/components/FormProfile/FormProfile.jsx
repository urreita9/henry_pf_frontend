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
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../redux/actions/actions';
import { capitalize, checkFormProfile, checkPassword } from '../../utils/functions';
import PassForm from '../PassForm/PassForm';
import UploadImg from '../UploadImg/UploadImg';

const initForm = {
    name: '',
    lastname: '',
    address: '',
};

const initErrors = {
    state: false,
    name: '',
    lastname: '',
    address: '',
};

const FormProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const [form, setForm] = useState(initForm);
    const [errors, setErrors] = useState(initErrors);
    const [edit, setEdit] = useState(false);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('uid');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!edit) {
            setEdit(!edit); //ACA SE EDITA
        } else {
            const check = checkFormProfile(form);
            setErrors((prevState) => {
                return { ...prevState, ...check };
            });

            if (!check.state) {
                setEdit(!edit); //ACA SE SUBMITEA
                dispatch(editUser(token, id, form));
            }
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
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
                        <UploadImg />
                        <TextField
                            id='Name'
                            name='name'
                            disabled={!!user.name || !edit}
                            error={!!errors.name}
                            helperText={!!errors.name && errors.name}
                            variant='filled'
                            label='Name'
                            value={form.name}
                            onChange={handleChange}
                        />
                        <TextField
                            id='Lastname'
                            name='lastname'
                            disabled={!!user.lastname || !edit}
                            error={!!errors.lastname}
                            helperText={!!errors.lastname && errors.lastname}
                            variant='filled'
                            label='Lastname'
                            value={form.lastname}
                            onChange={handleChange}
                        />
                        <TextField
                            id='Address'
                            disabled={!edit}
                            name='address'
                            error={!!errors.address}
                            helperText={!!errors.address && errors.address}
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

// <label htmlFor='file'>Choose 3 pictures that describes your home</label>
// <input type='file' name='image' onChange={handleFileInputChange}/>
