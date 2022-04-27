import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOperations } from '../../redux/actions/operationActions';
import CustomizedTables from '../HistoryTable/HistoryTable';
import { Operation } from '../Operation/Operation';
import { HistorySelect } from '../Select/HistorySelect';
import { Transaction } from '../Transaction/Transaction';

export const History = () => {
	const dispatch = useDispatch();
	const { filteredOperations } = useSelector(
		(state) => state.operationsReducer
	);
	// const { user } = useSelector((state) => state.userReducer);

	const token = localStorage.getItem('token');
	const uid = localStorage.getItem('uid');
	console.log(filteredOperations);
	useEffect(() => {
		if (!filteredOperations.length) {
			dispatch(getUserOperations(uid, token, true));
		}
	}, []);

	return (
		<>
			<HistorySelect />
			<CustomizedTables operations={filteredOperations} />
		</>
	);
};
