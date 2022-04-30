import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getAllOperations } from "../../redux/actions/operationActions"
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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

const AdminOperations = () => {
  const dispatch = useDispatch()
	const navigate = useNavigate();
  const { allOperationsAdmins } = useSelector(state => state.operationsReducer)
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('uid');

  if(allOperationsAdmins.length){
    //const {operation, user, caretaker, pet} = allOperationsAdmins
    //console.log(operation)
    //const {operationId, price, timeLapse, status} = allOperationsAdmins.operation
    // const {name, lastname, mail, address, img} = allOperationsAdmins.user
    // const {name: caretakerName, lastname: caretakerLastname, mail: caretakerMail, address: caretakerAddress, img: caretakerImg} = allOperationsAdmins.caretaker
    // const {name: petName} = allOperationsAdmins.pet

  } 

  useEffect(() => {
    dispatch(getAllOperations(token, uid));
  }, [dispatch])

  return (
    <TableContainer
			component={Paper}
			sx={{ maxWidth: 800, margin: '20px auto' }}
		>
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
					{allOperationsAdmins.map((op) => { 
            const {operation, user, caretaker, pet} = op
            console.log(operation)
            const {operationId, price, timeLapse, status, createdAt} = op.operation
            const {name, lastname, mail, address, img} = op.user
            const {name: caretakerName, lastname: caretakerLastname, mail: caretakerMail, address: caretakerAddress, id: caretakerId} = op.caretaker
            const {name: petName} = op.pet
            return ( 
						<StyledTableRow key={op.operation.id}>
							<StyledTableCell component='th' scope='row'>
								<Box style={{ display: 'flex', alignItems: 'center' }}>
									{/* <Avatar src={operation.caretaker.img} /> */}
									<Typography sx={{ marginLeft: '5px' }}>
										{capitalize(caretakerName)}{' '}
										{capitalize(caretakerLastname)}
									</Typography>
								</Box>
							</StyledTableCell>
							<StyledTableCell align='center'>
								{timeLapse}
							</StyledTableCell>
							<StyledTableCell align='center'>
								${price}
							</StyledTableCell>
							<StyledTableCell align='right'>
								{new Date(createdAt).getDate()}/
								{new Date(createdAt).getMonth() + 1}/
								{new Date(createdAt).getFullYear()}
							</StyledTableCell>
							<StyledTableCell component='th' scope='row'>
								<Box style={{ display: 'flex', alignItems: 'center' }}>
									{/*<Avatar src={operation.pet.img} />*/}
									<Typography sx={{ marginLeft: '5px' }}>
										{capitalize(petName)}
									</Typography>
								</Box>
							</StyledTableCell>
							<StyledTableCell align='right'>
								<Typography>{status}</Typography>
							</StyledTableCell>
							<StyledTableCell align='right'>
								<Button
									onClick={() => {
										navigate(`/caretaker/${caretakerId}`);
									}}
								>
									See Profile
								</Button>
								<Button
									onClick={() => {
										// dispatch(selectOperation(op.operation.id, user));
										// navigate(`/operation/${op.operation.id}`);
									}}
								>
									Operation Detail
								</Button>
							</StyledTableCell>
						</StyledTableRow>
            )
					})}
				</TableBody>
			</Table>
		</TableContainer>
  )
}

export default AdminOperations