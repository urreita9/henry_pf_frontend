import { Button, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	getCaretakerOperations,
	getUserOperations,
} from '../../redux/actions/operationActions';
import CustomizedTables from '../HistoryTable/HistoryTable';
import { Operation } from '../Operation/Operation';
import { HistorySelect } from '../Select/HistorySelect';
import { Transaction } from '../Transaction/Transaction';

export const History = () => {
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
		// <>
		// 	{!filteredOperations?.length ? (
		// 		<p> {filteredOperations.msg} </p>
		// 	) : (
		// 		<>
		// 			<HistorySelect />

		// 			<CustomizedTables operations={filteredOperations} />
		// 		</>
		// 	)}
		// </>
		<>
			{!user?.caretaker ? (
				<>
					{!filteredOperations?.length ? (
						<p> {filteredOperations.msg} </p>
					) : (
						<>
							<HistorySelect />

							<CustomizedTables filteredOperations={filteredOperations} />
						</>
					)}
				</>
			) : (
				<>
					<div>
						<Button onClick={handleClick}>
							{tableClick ? 'USER' : 'CARETAKER'}
						</Button>

						{tableClick ? (
							!filteredOperations?.length ? (
								<p> {filteredOperations.msg} </p>
							) : (
								<>
									<HistorySelect />
									<CustomizedTables filteredOperations={filteredOperations} />
								</>
							)
						) : !caretakerOperations?.length ? (
							<p> {caretakerOperations.msg} </p>
						) : (
							<>
								<HistorySelect />
								<CustomizedTables caretakerOperations={caretakerOperations} />
							</>
						)}
					</div>
				</>
			)}
		</>

		// <>
		// 	{!caretakerOperations?.length ? (
		// 		<p> {caretakerOperations.msg} </p>
		// 	) : (
		// 		<>
		// 			<div>
		// 				<Button onClick={handleClick}>
		// 					{tableClick ? 'USER' : 'CARETAKER'}
		// 				</Button>
		// 			</div>
		// 			{tableClick
		// 				? !filteredOperations?.length && (
		// 						<>
		// 							<HistorySelect />
		// 							<CustomizedTables operations={filteredOperations} />
		// 						</>
		// 				  )
		// 				: !caretakerOperations?.length && (
		// 						<>
		// 							<HistorySelect />
		// 							<CustomizedTables operations={caretakerOperations} />
		// 						</>
		// 				  )}
		// 		</>
		// 	)}
		// 	{!filteredOperations?.length && (
		// 		<>
		// 			<HistorySelect />
		// 			<CustomizedTables operations={filteredOperations} />
		// 		</>
		// 	)}
		// </>
	);
};
