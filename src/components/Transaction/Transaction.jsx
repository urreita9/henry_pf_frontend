import { Avatar, Card, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const Transaction = ({ operation, caretaker }) => {
	const { user } = useSelector((state) => state.userReducer);
	return (
		<Grid item>
			<Card>
				<Typography>${operation.price}</Typography>
			</Card>
			{operation.id}
		</Grid>
	);
};
