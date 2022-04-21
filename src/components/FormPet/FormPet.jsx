import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Switch,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPet, createPet, editUser, getUser } from '../../redux/actions/actions';
// import { capitalize } from '../../utils/functions';

const FormPet = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const [form, setForm] = useState({
        name: '',
        age: 0,
        race: 'dog',
        size: 'small',
        specialFood: false,
        img: '',
        userId: '',
    });
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('uid');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPet(token, form));
        dispatch(getUser(token, id));
    };

    const handleReset = (e) => {
        setForm({
            ...form,
            name: '',
            age: 0,
            race: 'dog',
            size: 'small',
            specialFood: false,
            img: '',
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSwitch = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked,
        });
    };

    useEffect(() => {
        setForm({
            ...form,
            userId: id,
        });

        return () => {
            dispatch(clearPet());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Box component='form' onSubmit={handleSubmit}>
            <Box>
                <FormControl
                    sx={{
                        height: '60vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'flex-start',
                    }}
                >
                    <TextField id='name' name='name' label='Pet name' value={form.name} onChange={handleChange} />
                    <TextField id='img' name='img' label='Pet foto' value={form.img} onChange={handleChange} />
                    <TextField
                        id='age'
                        name='age'
                        label='Pet age'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type='number'
                        value={form.age}
                        onChange={handleChange}
                    />
                    <FormControl>
                        <FormLabel>Type of Pet</FormLabel>
                        <RadioGroup row name='race' value={form.race} onChange={handleChange}>
                            <FormControlLabel value='dog' control={<Radio />} label='Dog' />
                            <FormControlLabel value='cat' control={<Radio />} label='Cat' />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Size</FormLabel>
                        <RadioGroup row name='size' value={form.size} onChange={handleChange}>
                            <FormControlLabel value='small' control={<Radio />} label='Small' />
                            <FormControlLabel value='medium' control={<Radio />} label='Medium' />
                            <FormControlLabel value='big' control={<Radio />} label='Big' />
                        </RadioGroup>
                    </FormControl>
                </FormControl>
                <FormControlLabel
                    control={<Switch checked={form.specialFood} onChange={handleSwitch} name='specialFood' />}
                    label='Special Food'
                    labelPlacement='start'
                />
            </Box>
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
                    Create
                </Button>
                <Button variant='contained' color='error' onClick={handleReset}>
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

export default FormPet;
