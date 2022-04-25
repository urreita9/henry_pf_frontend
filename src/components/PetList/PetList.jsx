import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PetCard from '../PetCard/PetCard';

const PetList = (props) => {
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    return (
        <div>
            <Typography variant='h4' component='h1'>PetList </Typography>
            
            <Box gap={2} sx={{ display: 'flex' }}>
                {typeof user.pets !== 'undefined' && user.pets.length > 0 ? (
                        user.pets?.map((el) => <PetCard key={el.id} {...el} />)
                ) : (
                    <>
                        <Typography>"No tienes ningun pet" </Typography>
                        <Button variant='contained' onClick={(e) => props.onClick(e, '3')}>
                            Agregar Pet
                        </Button>
                    </>
                )}
            </Box>
        </div>
    );
};

export default PetList;
