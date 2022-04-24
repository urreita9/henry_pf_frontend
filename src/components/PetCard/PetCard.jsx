import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPet, getUser } from '../../redux/actions/actions';
import { capitalize, checkEditPet, deletePet } from '../../utils/functions';
import swal from 'sweetalert';
import { height } from '@mui/system';
import UploadImgPet from '../UploadImg/UploadImgPet';

const PetCard = ({ age, id, img, name, race, size, specialFood, actions = true }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const user = useSelector((state) => state.userReducer.user);
    const uid = localStorage.getItem('uid');
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({
        name: capitalize(name),
        age,
        race,
        size,
        specialFood,
        id,
    });
    const [errors, setErrors] = useState({
        state: false,
        name: '',
        age: '',
        race: '',
        size: '',
        specialFood: '',
    });

    // const resp = await deletePet(token, id);  //??????

    const handleDelete = async (e) => {
        swal({
            title: 'Are you sure?',
            text: 'This will delete your pet forever!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                await deletePet(token, id);
                dispatch(getUser(token, uid));
                swal('Poof! Your pet is gone!', {
                    icon: 'success',
                });
            } else {
                swal('Your imaginary file is safe!');
            }
        });
    };

    const handleEdit = () => {
        setEdit(true);
    };

    const handleSave = (e) => {
        const check = checkEditPet(form);
        setErrors((prevState) => {
            return { ...prevState, ...check };
        });

        if (!check.state) {
            dispatch(editPet(token, uid, form));
            setEdit(false);
        }
    };

    const handleCancel = () => {
        setEdit(false);
        setForm({
            name: capitalize(name),
            age,
            race,
            size,
            specialFood,
            id,
        });
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

    const handleSwitch = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked,
        });
    };

    return (
        <Card sx={{ width: '300px', height: '600px', display: 'flex', flexDirection: 'column' }}>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '500px',
                }}
            >
                <UploadImgPet image={img} id={id} />
                {/* <Avatar alt='PetImg' src={img} sx={{ width: '150px', height: '150px' }} /> */}

                <TextField
                    error={!!errors.name}
                    helperText={!!errors.name && errors.name}
                    disabled={!edit}
                    name='name'
                    label='Pet name'
                    value={form.name}
                    onChange={handleChange}
                />
                <TextField
                    name='age'
                    label='Pet age'
                    disabled={!edit}
                    InputProps={{ inputProps: { min: 1, max: 25 } }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type='number'
                    value={form.age}
                    onChange={handleChange}
                />
                <FormControl disabled={!edit}>
                    <FormLabel>Type of Pet</FormLabel>
                    <RadioGroup row name='race' value={form.race} onChange={handleChange}>
                        <FormControlLabel value='dog' control={<Radio />} label='Dog' />
                        <FormControlLabel value='cat' control={<Radio />} label='Cat' />
                    </RadioGroup>
                </FormControl>
                <FormControl disabled={!edit}>
                    <FormLabel>Size</FormLabel>
                    <RadioGroup row name='size' value={form.size} onChange={handleChange}>
                        <FormControlLabel value='SMALL' control={<Radio />} label='Small' />
                        <FormControlLabel value='MEDIUM' control={<Radio />} label='Medium' />
                        <FormControlLabel value='BIG' control={<Radio />} label='Big' />
                    </RadioGroup>
                </FormControl>
                <FormControlLabel
                    disabled={!edit}
                    control={<Switch checked={form.specialFood} onChange={handleSwitch} name='specialFood' />}
                    label='Special Food'
                    labelPlacement='start'
                />
            </CardContent>
            {actions ? (
                <CardActions display='flex' sx={{ flexDirection: 'column' }}>
                    {!edit ? (
                        <Box>
                            <Button variant='contained' onClick={handleEdit}>
                                Edit pet
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Button variant='contained' onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant='contained' onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Box>
                    )}

                    <Button variant='contained' color='error' onClick={handleDelete}>
                        Delete Pet
                    </Button>
                </CardActions>
            ) : null}
        </Card>
    );
};

export default PetCard;
