import {
    Box,
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../redux/actions/actions';
import { capitalize, checkPassword } from '../../utils/functions';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const UploadImg = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [editImg, setEditImg] = useState(false);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('uid');

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setForm(reader.result);
        };
        setError('');
    };

    const handleCancel = () => {
        setEditImg(!editImg);
        setMsg('');
        setForm('');
        document.getElementById('ProfileFormImg').value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!editImg) {
            setEditImg(!editImg); //ACA SE EDITA
            setMsg('');
        } else {
            if (!!form) {
                setEditImg(!editImg); //ACA SE SUBMITEA
                dispatch(editUser(token, id, { img: form }));
                document.getElementById('ProfileFormImg').value = '';
                setForm('');
                setMsg('Imagen subida correctamente');
            } else {
                setError('Necesita cargar primero una imagen');
            }
        }
    };

    return (
        <>
            <Box component={'form'} onSubmit={handleSubmit}>
                <label htmlFor='ProfileFormImg'>
                    <Input
                        disabled={!editImg}
                        accept='image/*'
                        id='ProfileFormImg'
                        type='file'
                        name='img'
                        onChange={handleFileInputChange}
                    />
                    <Button
                        disabled={!editImg}
                        variant='contained'
                        onChange={handleFileInputChange}
                        name='img'
                        component='span'
                    >
                        Upload
                    </Button>
                    <Typography variant='subtitle1' color='primary'>
                        {!!msg || !!error ? msg || error : null}
                    </Typography>
                </label>

                {/* <TextField type='file' name='img' disabled={!editImg} onChange={handleFileInputChange} label=' '>
                    Cargar Imagen
                </TextField> */}
                {!editImg ? (
                    <Box>
                        <Button variant='contained' type='submit' onClick={handleSubmit}>
                            Edit Img
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
                        <Button variant='contained' type='submit' onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant='contained' color='error' onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default UploadImg;
