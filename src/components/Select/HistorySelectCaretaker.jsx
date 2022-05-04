import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { differenceInCalendarDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import {
	filterByDate,
	filterByDateCaretaker,
} from '../../redux/actions/operationActions';

export const HistorySelectCaretaker = () => {
	const [days, setDays] = useState('');
	const dispatch = useDispatch();
	const handleChange = (event) => {
		setDays(event.target.value);
	};

	useEffect(() => {
		if (typeof days !== 'string') {
			dispatch(filterByDateCaretaker(days));
		}
	}, [days]);

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Days</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={days}
					label='Days'
					onChange={handleChange}
				>
					<MenuItem value={0}>All</MenuItem>
					<MenuItem value={7}>Last week</MenuItem>
					<MenuItem value={30}>Last month</MenuItem>
					<MenuItem value={90}>Last three months</MenuItem>
					<MenuItem value={180}>Last six months</MenuItem>
					<MenuItem value={365}>Last year</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};
