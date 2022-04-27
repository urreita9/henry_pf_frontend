import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOperations } from '../../redux/actions/operationActions';
import { Operation } from '../Operation/Operation';

export const Operations = () => {
	const dispatch = useDispatch();
	const { operations } = useSelector((state) => state.operationsReducer);
	// const { user } = useSelector((state) => state.userReducer);

	const token = localStorage.getItem('token');
	const uid = localStorage.getItem('uid');
	useEffect(() => {
		if (!operations.length) {
			dispatch(getUserOperations(uid, token, true));
		}
	}, []);
	return (
		<Container>
			<Grid container spacing={3}>
				{operations?.length &&
					operations.map((operation) => (
						<Grid item key={operation.id}>
							{operation.id}
						</Grid>
					))}
			</Grid>
		</Container>
	);
};
