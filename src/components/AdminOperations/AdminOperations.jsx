import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getAllOperations, selectOperation, updateOperationStatus } from "../../redux/actions/operationActions"
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AdminOperationCard from "../AdminOperationCard/AdminOperationCard";
import AdminOperationsFilter from "../AdminOperationsFilter/AdminOperationsFilter";
import { orderFunc, filterFunc, searchFunc, paginationFunc } from './functions';
import AdminPagination from "../AdminPagination/AdminPagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.hint,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
// 	'&:nth-of-type(odd)': {
// 		backgroundColor: theme.palette.background.paper,
// 	},
// 	// hide last border
// 	'&:last-child td, &:last-child th': {
// 		border: 0,
// 	},
// }));

const AdminOperations = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const { operations } = useSelector(state => state.operationsReducer)
	const userAdmin = useSelector(state => state.userReducer)
	//const users = useSelector((state) => state.adminReducer.users);
	//const [filteredUsers, setfilteredUsers] = useState([]);
	const [filteredOperations, setfilteredOperations] = useState([]);

	const [order, setOrder] = useState('');
	const [filter, setFilter] = useState({
		caretaker: '',
		status: '',
		banned: '',
		dispatch: '',
	});
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [items, setItems] = useState(0);
	const token = localStorage.getItem('token');
	const uid = localStorage.getItem('uid');

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

	useEffect(() => {
		if (!Object.keys(operations).includes('msg')) {

			const searchedOperations = searchFunc(operations, search);
			const filteredOperations = filterFunc(searchedOperations, filter);
			const ordenedOperations = orderFunc(filteredOperations, order);
			const paginatedOperations = paginationFunc(ordenedOperations, page, perPage);
			const floor = Math.floor(ordenedOperations.length / perPage);
			const real = ordenedOperations.length / perPage;

			if (floor === real) {
				setItems(real);
			} else if (floor === 0) {
				setItems(1);
			} else {
				setItems(floor + 1);
			}

			setfilteredOperations(paginatedOperations);
		}
	}, [operations, order, filter, search, page, perPage]);

	return (
		<>
			<TableContainer
				component={Box}
				sx={{ maxWidth: '100%', margin: '5px auto', padding: '10px' }}
			//sx={{ height: '60px', marginBottom: '10px' }}
			>
				<AdminOperationsFilter
					order={order}
					filter={filter}
					search={search}
					perPage={perPage}
					setOrder={setOrder}
					setFilter={setFilter}
					setSearch={setSearch}
					setPerPage={setPerPage}
					setPage={setPage}
				/>
			</TableContainer>
			<TableContainer
				component={Box}
				sx={{ maxWidth: '100%', margin: '5px auto', padding: '10px' }}
			//sx={{ height: '60px', marginBottom: '10px' }}
			>
				<AdminPagination items={items} page={page} setPage={setPage} />
			</TableContainer>
			<TableContainer
				component={Paper}
				sx={{ maxWidth: '100vw', margin: '20px auto' }}
			>
				<Table sx={{ minWidth: 400 }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<StyledTableCell align='left'>User</StyledTableCell>
							<StyledTableCell align='left'>User Mail</StyledTableCell>
							<StyledTableCell align='left'>Caretaker</StyledTableCell>
							<StyledTableCell align='left'>Caretaker Mail</StyledTableCell>
							<StyledTableCell align='center'>Nights</StyledTableCell>
							<StyledTableCell align='center'>Total</StyledTableCell>
							<StyledTableCell align='center'>Date</StyledTableCell>
							<StyledTableCell align='center'>Pet</StyledTableCell>
							<StyledTableCell align='center'>Status</StyledTableCell>
							<StyledTableCell align='center'>Dispatch</StyledTableCell>
							<StyledTableCell align='center'>Actions</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!Object.keys(operations).includes('msg') &&
							operations.length ? filteredOperations?.map((op) => (
								<AdminOperationCard userAdmin={userAdmin.user} op={op} handleProfile={handleProfile} handleDetails={handleDetails} handleStatus={handleStatus} />
							)) : <p>Empty Operations</p>}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default AdminOperations