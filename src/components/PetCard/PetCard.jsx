import { Avatar, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/actions';
import { deletePet } from '../../utils/functions';

const PetCard = ({ age, id, img, name, race, size, specialFood, actions = true }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');

    const handleDelete = async (e) => {
        const resp = await deletePet(token, id);
        dispatch(getUser(token, uid));
    };

    return (
        <Card>
            <CardContent>
                <Avatar alt='PetImg' src={img} />
                {/* <Typography>{id}</Typography> */}
                <Typography>{name}</Typography>
                <Typography>{age}</Typography>
                <Typography>{race}</Typography>
                <Typography>{size}</Typography>
                <Typography>{specialFood ? 'Si' : 'No'}</Typography>
            </CardContent>
            {actions ? (
                <CardActions>
                    <Button onClick={handleDelete}>Delete Pet</Button>
                </CardActions>
            ) : null}
        </Card>
    );
};

export default PetCard;
