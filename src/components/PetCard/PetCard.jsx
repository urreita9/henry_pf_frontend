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
    Fab,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPet, getUser } from '../../redux/actions/actions';
import { capitalize, checkEditPet, deletePet } from '../../utils/functions';
import swal from 'sweetalert';
import { height } from '@mui/system';
import UploadImgPet from '../UploadImg/UploadImgPet';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', borderRadius: '10px', boxSizing: 'content-box'}} elevation={5}>
            <Box sx={{position: 'relative', width: '100%'}}>
            {actions ? (
                <Fab size="small" color="error" aria-label="delete" onClick={handleDelete} sx={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px'
                }}>
                <DeleteIcon />
                </Fab>

            ): null}

            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <UploadImgPet image={img} id={id} />

                </Box>
                {/* <Avatar alt='PetImg' src={img} sx={{ width: '150px', height: '150px' }} /> */}
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    padding: '0.7rem',
                    marginRight: '0.7rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    gap: '10px',

                }}>
                    
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
                        {actions ? (
                <CardActions display='flex' sx={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {!edit ? (
                       <Button variant='contained' onClick={handleEdit}>
                                Edit pet
                        </Button>

                    ) : (
                        <>
                            <Button variant='contained' onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant='contained' onClick={handleCancel}>
                                Cancel
                            </Button>
                        </>
                    )}
                </CardActions>
            ) : null}
            </Box>

            </CardContent>

            </Box>
        </Card>
    );
};

export default PetCard;
