import { Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getCaretakerOperations,
	getUserOperations,
} from '../../redux/actions/operationActions';
import CustomizedCaretakerTables from '../HistoryCaretakerTable/HistoryCaretakerTable';
import CustomizedTables from '../HistoryTable/HistoryTable';
import { Operation } from '../Operation/Operation';
import { HistorySelect, HistorySelectUser } from '../Select/HistorySelect';
import { HistorySelectCaretaker } from '../Select/HistorySelectCaretaker';
import { Transaction } from '../Transaction/Transaction';

export const History = ({ showUser }) => {
	const [tableClick, setTableClick] = useState(true);
	const dispatch = useDispatch();
	const { filteredOperations, caretakerOperations } = useSelector(
		(state) => state.operationsReducer
	);
	const { user } = useSelector((state) => state.userReducer);

	const token = localStorage.getItem('token');
	const uid = localStorage.getItem('uid');
	console.log(filteredOperations);
	useEffect(() => {
		dispatch(getUserOperations(uid, token, true));
		if (user?.caretaker) {
			dispatch(getCaretakerOperations(uid, token, false));
		}
	}, []);

	const handleClick = () => {
		setTableClick(!tableClick);
	};
	return (
		<>
			{showUser ? (
				!filteredOperations?.length ? (
					<p> {filteredOperations.msg} </p>
				) : (
					<>
						<HistorySelectUser />

						<CustomizedTables filteredOperations={filteredOperations} />
					</>
				)
			) : !caretakerOperations?.length ? (
				<p> {caretakerOperations.msg} </p>
			) : (
				<>
					<HistorySelectCaretaker />

					<CustomizedCaretakerTables
						caretakerOperations={caretakerOperations}
					/>
				</>
			)}
			{}
		</>
	);
};
