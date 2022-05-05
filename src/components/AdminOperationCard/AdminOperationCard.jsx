import { Box, Button, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { capitalize } from '../../utils/functions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.hint,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.paper,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AdminOperationCard = ({ userAdmin, op, handleProfile, handleDetails, handleStatus }) => {
    const { operation, user, caretaker, pet } = op;
    const { id: operationId, price, timeLapse, status, createdAt, dispatch, petReceived, petDelivered } = op.operation;
    const { name, lastname, email, address, img } = op.user;
    const {
        name: caretakerName,
        lastname: caretakerLastname,
        email: caretakerEmail,
        address: caretakerAddress,
        id: caretakerId,
    } = op.caretaker;
    const { name: petName } = op.pet;

    return (
        <StyledTableRow key={operation.id}>
            <StyledTableCell component='th' scope='row'>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ marginLeft: '5px' }}>
                        {capitalize(name)} {capitalize(lastname)}
                    </Typography>
                </Box>
            </StyledTableCell>
            <StyledTableCell component='th' scope='row'>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ marginLeft: '5px' }}>{email}</Typography>
                </Box>
            </StyledTableCell>
            <StyledTableCell component='th' scope='row'>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ marginLeft: '5px' }}>
                        {capitalize(caretakerName)} {capitalize(caretakerLastname)}
                    </Typography>
                </Box>
            </StyledTableCell>
            <StyledTableCell component='th' scope='row'>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ marginLeft: '5px' }}>{caretakerEmail}</Typography>
                </Box>
            </StyledTableCell>
            <StyledTableCell align='center'>{timeLapse}</StyledTableCell>
            <StyledTableCell align='center'>${price}</StyledTableCell>
            <StyledTableCell align='right'>
                {new Date(createdAt).getDate()}/{new Date(createdAt).getMonth() + 1}/{new Date(createdAt).getFullYear()}
            </StyledTableCell>
            <StyledTableCell component='th' scope='row'>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ marginLeft: '5px' }}>{capitalize(petName)}</Typography>
                </Box>
            </StyledTableCell>
            <StyledTableCell align='right'>
                <Typography>{status}</Typography>
            </StyledTableCell>
            <StyledTableCell align='center'>
                {status === 'COMPLETED' && dispatch ? (
                    <Typography style={{ color: 'green' }}> OK</Typography>
                ) : status !== 'COMPLETED' ? (
                    <Typography> - </Typography>
                ) : (
                    <Typography style={{ color: 'red' }}> Undispatch</Typography>
                )}
            </StyledTableCell>
            <StyledTableCell align='right'>
                <Button onClick={() => handleProfile(caretakerId)}>See Profile</Button>
                <Button onClick={() => handleDetails(operationId, user)}>Operation Detail</Button>
                {status === 'APPROVED' && userAdmin.role === 'ADMIN' ? (
                    <Button onClick={() => handleStatus(operationId)}>Complete Operation</Button>
                ) : status === 'APPROVED' && userAdmin.role === 'SUPER_ADMIN' ? (
                    <Button onClick={() => handleStatus(operationId)}>Complete & Dispatch Operation</Button>
                ) : status === 'COMPLETED' && !dispatch && userAdmin.role === 'SUPER_ADMIN' ? (
                    <Button onClick={() => handleStatus(operationId)}>Dispatch Operation</Button>
                ) : null}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default AdminOperationCard;
