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

	const uid = localStorage.getItem('uid');
	useEffect(() => {
		dispatch(getUserOperations(uid, true));
	}, [dispatch]);
	return (
		<Container>
			<Grid container spacing={3}>
				{operations?.length &&
					operations.map(
						({ id, userId, caretakerId, timeLapse, price, status }) => (
							<Operation
								key={id}
								price={price}
								id={id}
								userId={userId}
								caretakerId={caretakerId}
								timeLapse={timeLapse}
								status={status}
							/>
						)
					)}
			</Grid>
		</Container>
	);
};
