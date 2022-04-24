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
import { editUser } from '../../redux/actions/actions';
import { capitalize, checkPassword } from '../../utils/functions';
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadIcon from '@mui/icons-material/Upload';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
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
  opacity: 0.4,
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
  opacity: 0
}));
const Input = styled('input')({
    display: 'none',
});

const UploadImg = ({image}) => {
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        <ImageButton
          focusRipple 
          style={{
            width: "300px",
          }}
          type='submit' onClick={handleSubmit}
        >
          <ImageSrc style={{ backgroundImage: `url(${image})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root">
            <Image>
                <PhotoCameraIcon />
            </Image>
          </ImageBackdrop>
        </ImageButton>

        </Box>
            <Box component={'form'} onSubmit={handleSubmit}>


                {/* <TextField type='file' name='img' disabled={!editImg} onChange={handleFileInputChange} label=' '>
                    Cargar Imagen
                </TextField> */}
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
                        startIcon={<UploadIcon />}
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
