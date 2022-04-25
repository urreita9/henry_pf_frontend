import {
    Box,
    Button,
    ButtonBase,
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
import { editPet, editUser } from '../../redux/actions/actions';
import { capitalize, checkPassword } from '../../utils/functions';
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 150,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.5,
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    transition: theme.transitions.create('opacity'),
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
}));

const Input = styled('input')({
    display: 'none',
});

const UploadImgPet = ({ image, id }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        img: '',
        id,
    });
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [editImg, setEditImg] = useState(false);
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    const [nameFile, setNameFile] = useState("");

    const handleEditImg = (e) => {
        setEditImg(true);
        setError('');
        setMsg('');
        setNameFile("");
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setNameFile(file.name);
        previewFile(file);
    };

    const previewFile = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setForm({
                ...form,
                img: reader.result,
            });
        };
        setError('');
    };

    const handleCancel = () => {
        setEditImg(!editImg);
        setMsg('');
        setError('');
        setForm({
            ...form,
            img: '',
        });
        setNameFile("");
        document.getElementById('PetImg').value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!!form.img) {
            setEditImg(!editImg);
            dispatch(editPet(token, uid, form));
            document.getElementById('PetImg').value = '';
            setForm({
                ...form,
                img: '',
            });
            setMsg('Imagen subida correctamente');
            setNameFile("");
        } else {
            setError('Necesita cargar primero una imagen');
        }
    };

    return (
        <>
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexWrap: "wrap",
            gap: '10px',
            height: '100%',
            minWidth: '150px',
            width: "100%",
            }}
        >
            <ImageButton
                focusRipple
                style={{
                    width: '150px',
                    borderRadius: '150%',
                    zIndex: '0',
                    border: '5px solid #F29278'
                }}
                onClick={handleEditImg}
            >
                <ImageSrc style={{ backgroundImage: `url(${image})`, borderRadius: '50%' }} />
                <ImageBackdrop className='MuiImageBackdrop-root'>
                    <Image style={{ borderRadius: '50%' }}>
                        Edit Photo
                    </Image>
                </ImageBackdrop>
            </ImageButton>
            {editImg && (
          <>
            {nameFile ? (
              <Typography variant="subtitle1" sx={{color: '#444'}}>
                {nameFile}
              </Typography>
            ) : (
              <Typography variant="subtitle1" color="primary">
                {!!msg || !!error ? msg || error : null}
              </Typography>
            )}
          </>
        )}
            {editImg && (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <label htmlFor='PetImg'>
                        <Input
                            disabled={!editImg}
                            accept='image/*'
                            id='PetImg'
                            type='file'
                            name='img'
                            onChange={handleFileInputChange}
                        />
                        <Button
                            disabled={!editImg}
                            startIcon={<UploadIcon />}
                            variant='contained'
                            onChange={handleFileInputChange}
                            name='img'
                            component='span'
                        >
                            Upload
                        </Button>
                    </label>
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

export default UploadImgPet;
