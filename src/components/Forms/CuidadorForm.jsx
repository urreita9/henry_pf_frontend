import { useState } from 'react';
import {
  Box,
  Button,
  Radio,
  TextField,
  Typography,
  Input,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Mapa } from '../Map/Mapa';
import { useDispatch } from 'react-redux';
import { postCaretaker } from '../../redux/actions/actions';
import TestCloudinary from '../TestCloudinary';
// import { Label } from '@mui/icons-material';
// import { useParams } from 'react-router-dom';

const initialForm = {
  lat: -38.024157,
  lng: -57.53561,
  price: 10,
  size: '1',
  description: 'Hi Im John and I live in...',
  homeDescription: 'My house has a garden...',
  rating: 4,
  images: [],
  //image:
  // 'https://karlaperezyt.com/wp-content/uploads/kui_system/telegram_profiles/2980022.jpg',
};
export const CuidadorForm = () => {
  const MAX_LENGTH = 3;
  const [form, setForm] = useState(initialForm);
  const [isTouched, setIsTouched] = useState(false);
  const userId = '38a043a0-e45d-4385-8d28-18a9362d15be';
  const dispatch = useDispatch();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const handleInputChange = (e) => {
    // if (
    //   e.target.name !== 'description' ||
    //   e.target.name !== 'homeDescription'
    // ) {
    //   setForm({
    //     ...form,
    //     [e.target.name]: parseInt(e.target.value),
    //     image: previewSource,
    //   });
    // }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      //image: previewSource,
    });
    console.log(form);
  };

  const controlProps = (item) => ({
    checked: form.size === item,
    onChange: handleInputChange,
    value: item,
    name: 'size',
    inputprops: { 'aria-label': item },
  });
  const onSave = () => {
    //console.log(previewSource);
    console.log(form);
    if (form.images.length !== MAX_LENGTH) return;
    dispatch(postCaretaker({ ...form, userId }));
  };

  const handleFileInputChange = (e) => {
    //const file = e.target.files[0];
    const files = Array.from(e.target.files);
    previewFile(files);
  };

  const previewFile = async (files) => {
    //reader.readAsDataURL(file);
    const filesURL = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
    setForm({
      ...form,
      images: await Promise.all(filesURL),
    });

    // then((data) =>
    //     setForm({ ...form, images: [...form.images, data] })
    //   );
    // reader.onloadend = () => {
    //   setForm({ ...form, image: reader.result });
    // };
    // filesURL.forEach(() => {
    //   reader.onloadend = () => {
    //     setForm({ ...form, images: [...form.images, reader.result] });
    //   };
    // });
  };

  console.log(form);

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      <Typography variant='h4'>
        Fill in this form and start recievieng pets!
      </Typography>
      <TextField
        fullWidth
        rows={4}
        sx={{ marginTop: 2, marginBottom: 1 }}
        placeholder='Hi! Im John. I am 25 years old and...'
        autoFocus
        multiline
        label='The users want to know you before they decide...'
        helperText={!form.description && isTouched && 'Tell us about yourself'}
        // error={!form.description && isTouched}
        value={form.description}
        onChange={handleInputChange}
        onBlur={() => setIsTouched(true)}
        name='description'
      />

      {/* <TestCloudinary /> */}
      <div>
        {/* <form onSubmit={handleSubmitFile}> */}
        <input
          type='file'
          name='image'
          onChange={handleFileInputChange}
          value={fileInputState}
          multiple
        />
        {/* <button type='submit'>Upload</button> */}
        {/* </form> */}
        {form.images?.length &&
          form.images.map((image) => (
            <img src={image} alt='img' style={{ height: '300px' }} />
          ))}
      </div>
      <div>
        <Typography>Pet size you are able to take care of</Typography>
        <Radio
          {...controlProps('0')}
          size='small'
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 20,
              color: '#F29279',
            },
          }}
          label='Small'
        />
        <Radio
          {...controlProps('1')}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 24,
              color: '#F29279',
            },
          }}
          label='Medium'
        />
        <Radio
          {...controlProps('2')}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 30,
              color: '#F29279',
            },
          }}
          label='Big'
        />
      </div>
      <Typography>$ Price per night </Typography>
      <Input
        value={form.price}
        type='number'
        onChange={handleInputChange}
        name='price'
        placeholder='$10'
      />

      <Typography>Put your Marker on the Map</Typography>
      <Box
        sx={{
          position: 'relative',
          maxWidth: '100%',
          height: '500px',
        }}
      >
        <Mapa formUse={true} setFormCoords={setForm} form={form} />
      </Box>

      <TextField
        fullWidth
        rows={4}
        sx={{ marginTop: 2, marginBottom: 1 }}
        placeholder='Nice neighborhood, with a small garden...'
        autoFocus
        multiline
        label='Home description'
        helperText={
          !form.homeDescription && isTouched && 'Tell us about your home'
        }
        // error={!form.description && isTouched}
        value={form.homeDescription}
        onChange={handleInputChange}
        onBlur={() => setIsTouched(true)}
        name='homeDescription'
      />

      <Box display='flex' justifyContent='space-between'>
        <Button
          variant='text'
          onClick={() => {
            setForm(initialForm);
            setIsTouched(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#F29279',
            color: 'white',
            borderColor: '#F29279',
          }}
          endIcon={<SaveOutlinedIcon />}
          onClick={onSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
