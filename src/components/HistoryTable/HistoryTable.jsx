import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { capitalize } from '../../utils/functions';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { finishOperation, selectOperation } from '../../redux/actions/operationActions';

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

export default function CustomizedTables({ filteredOperations }) {
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid');

    console.log('TABLE', filteredOperations);
    return (
        <>
            {filteredOperations?.length && (
                <>
                    {' '}
                    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: '20px auto' }}>
                        <Table sx={{ minWidth: 400 }} aria-label='customized table'>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='left'>Caretaker</StyledTableCell>
                                    <StyledTableCell align='center'>Nights</StyledTableCell>
                                    <StyledTableCell align='center'>Total</StyledTableCell>
                                    <StyledTableCell align='center'>Date</StyledTableCell>
                                    <StyledTableCell align='center'>Pet</StyledTableCell>
                                    <StyledTableCell align='center'>Status</StyledTableCell>
                                    <StyledTableCell align='center'>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredOperations?.map((operation) => (
                                    <StyledTableRow key={operation.operation.id}>
                                        <StyledTableCell component='th' scope='row'>
                                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                                {' '}
                                                <Avatar src={operation.caretaker.img} />
                                                <Typography sx={{ marginLeft: '5px' }}>
                                                    {capitalize(operation.caretaker.name)}{' '}
                                                    {capitalize(operation.caretaker.lastname)}
                                                </Typography>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {operation.operation.timeLapse}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>${operation.operation.price}</StyledTableCell>
                                        <StyledTableCell align='right'>
                                            {new Date(operation.operation.createdAt).getDate()}/
                                            {new Date(operation.operation.createdAt).getMonth() + 1}/
                                            {new Date(operation.operation.createdAt).getFullYear()}
                                        </StyledTableCell>
                                        <StyledTableCell component='th' scope='row'>
                                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                                {' '}
                                                <Avatar src={operation.pet.img} />
                                                <Typography sx={{ marginLeft: '5px' }}>
                                                    {capitalize(operation.pet.name)}{' '}
                                                </Typography>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align='right'>
                                            <Typography>{operation.operation.status}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align='right'>
                                            <Button
                                                onClick={() => {
                                                    navigate(`/caretaker/${operation.caretaker.id}`);
                                                }}
                                            >
                                                See Profile
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    dispatch(selectOperation(operation.operation.id, user));
                                                    navigate(`/operation/${operation.operation.id}`);
                                                }}
                                            >
                                                Operation Detail
                                            </Button>
                                            {/* {!operation.operation.petReceived && (
												<Button
													onClick={() => {
														dispatch(
															finishOperation(uid, operation.operation.id, true)
														);
													}}
												>
													I Received my pet
												</Button>
											)} */}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
}
