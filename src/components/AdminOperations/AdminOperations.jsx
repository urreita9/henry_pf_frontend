import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getAllOperations, selectOperation, updateOperationStatus } from "../../redux/actions/operationActions"
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AdminOperationCard from "../AdminOperationCard/AdminOperationCard";

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
	const { operations } = useSelector(state => state.operationsReducer)
	const token = localStorage.getItem('token');
	const uid = localStorage.getItem('uid');
	console.log(operations)
	useEffect(() => {
		dispatch(getAllOperations(token, uid));
	}, [dispatch])

	const handleProfile = (caretakerId) => {
		navigate(`/caretaker/${caretakerId}`);
	}

	const handleDetails = (id, user) => {
		dispatch(selectOperation(id, user));
		navigate(`/operation/${id}`);
	}

	const handleStatus = (operationId) => {
		dispatch(updateOperationStatus(token, uid, operationId));
	}

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
					{!Object.keys(operations).includes('msg') &&
						operations.length ? operations?.map((op) => (
							<AdminOperationCard op={op} handleProfile={handleProfile} handleDetails={handleDetails} handleStatus={handleStatus} />
						)) : <p>Empty Operations</p>}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default AdminOperations