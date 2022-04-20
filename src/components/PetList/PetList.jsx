import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PetCard from '../PetCard/PetCard';

const PetList = () => {
    const pets = useSelector((state) => state.userReducer.pets);

    return (
        <div>
            <h1>PetList</h1>

            <Box gap={2} sx={{ display: 'flex' }}>
                {pets?.length !== 0 ? (
                    pets.map((el) => <PetCard key={el.id} {...el} />)
                ) : (
                    <Typography>"No tienes ningun pet"</Typography>
                )}
            </Box>
        </div>
    );
};

export default PetList;
