import { useEffect, useState } from 'react';
import { intervalToDuration, differenceInCalendarDays } from 'date-fns';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import LoginModal from '../LoginModal/LoginModal';
import { setOperation } from '../../redux/actions/operationActions';
import { useParams } from 'react-router-dom';
import { BasicSelect } from '../Select/HistorySelect';
import { TicketSelect } from '../Select/TicketSelect';

const TicketCard = ({ price, datesRange }) => {
    const { logged, user } = useSelector((state) => state.userReducer);
    const [pet, setPet] = useState('');
    const dispatch = useDispatch();
    const timeLapse = intervalToDuration({
        start: new Date(datesRange[0].startDate),
        end: new Date(datesRange[0].endDate),
    }).days;

    const time = differenceInCalendarDays(new Date(datesRange[0].endDate), new Date(datesRange[0].startDate));
    const params = useParams();
    const { id } = params;
    const [openLogin, setOpenLogin] = useState(false);
    const { caretakerProfile } = useSelector((state) => state.cuidadoresReducer);

    useEffect(() => {
        if (user?.pets?.length) {
            setPet(user.pets[0].id);
        }
    }, []);

    const handleLoginModal = () => {
        setOpenLogin(!openLogin);
    };
    console.log('DATES RANGE', time);

    const sum = price * time;
    const totalCheckout = sum + sum * 0.03;
    const uid = localStorage.getItem('uid');

    const handleOperationSubmit = () => {
        const startDate = `${datesRange[0].startDate.getDate()}/${
            datesRange[0].startDate.getMonth() + 1
        }/${datesRange[0].startDate.getFullYear()}`;
        const endDate = `${datesRange[0].endDate.getDate()}/${
            datesRange[0].endDate.getMonth() + 1
        }/${datesRange[0].endDate.getFullYear()}`;

        dispatch(
            setOperation({
                id,
                totalCheckout,
                timeLapse,
                uid,
                pet: pet,
                startDate,
                endDate,
                user,
            })
        );
    };

    // dispatch(
    //   setOperation({
    //     id,
    //     totalCheckout,
    //     timeLapse,
    //     uid,
    //     pet: pet,
    //     startDate,
    //     endDate,
    //   })
    // );
    // };

    // console.log('TICKET USER', user);
    return (
        <>
            <CardContent>
                <Typography sx={{ fontSize: 14, textAlign: 'end' }} color='text.secondary' gutterBottom>
                    ${price} per night
                </Typography>
                <Typography variant='h5' component='div'>
                    Checkout
                </Typography>
                {time !== 0 && datesRange[0].endDate && (
                    <>
                        <Typography sx={{ mb: 1, textAlign: 'end' }} color='text.secondary'>
                            {datesRange[0].startDate.getDate()}/{datesRange[0].startDate.getMonth()}/
                            {datesRange[0].startDate.getFullYear()} -{datesRange[0].endDate.getDate()}/
                            {datesRange[0].endDate.getMonth()}/{datesRange[0].endDate.getFullYear()}
                        </Typography>
                        <Typography sx={{ mb: 1 }} color='text.secondary'>
                            {time === 1 ? `$${price} x ${time} night` : `$${price} x ${time} nights`}
                        </Typography>
                        <Typography sx={{ mb: 1 }} color='text.secondary'>
                            2% Cleaning fee
                        </Typography>
                        <Typography sx={{ mb: 1 }} color='text.secondary'>
                            1% PeTrip fee
                        </Typography>
                    </>
                )}

                <Typography variant='h6' sx={{ textAlign: 'end' }}>
                    Total ${totalCheckout}
                </Typography>
            </CardContent>
            {user?.pets?.length ? <TicketSelect pets={user.pets} pet={pet} setPet={setPet} /> : null}

            <CardActions sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    {logged || user?.pets?.length ? (
                        <Button
                            variant='contained'
                            size='medium'
                            sx={{ backgroundColor: '#F29278' }}
                            onClick={() => {
                                if (!logged) {
                                    return;
                                }
                                if (!time) {
                                    return;
                                }
                                handleOperationSubmit();
                            }}
                            disabled={user.id === caretakerProfile.id || !user?.pets?.length ? true : false}
                        >
                            Checkout
                        </Button>
                    ) : (
                        <LoginModal openLogin={openLogin} handleLoginModal={handleLoginModal} />
                    )}
                </Box>
            </CardActions>
        </>
    );
};

export const Ticket = ({ price, datesRange }) => {
    return (
        <Box sx={{ width: '90%' }}>
            <Card variant='outlined'>
                <TicketCard price={price} datesRange={datesRange} />
            </Card>
        </Box>
    );
};
