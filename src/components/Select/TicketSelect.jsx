import { useEffect, useState } from 'react';
import {
	Avatar,
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { differenceInCalendarDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { filterByDate } from '../../redux/actions/operationActions';

export const TicketSelect = ({ pets, pet, setPet }) => {
	const dispatch = useDispatch();
	const handleChange = (event) => {
		setPet(event.target.value);
	};

	useEffect(() => {
		if (typeof pet !== 'string') {
			dispatch(filterByDate(pet));
		}
	}, [pet]);

	return (
		<Box
			sx={{
				minWidth: 40,
				mazWidth: 120,
				width: '200px',
				display: 'flex',
				justifyContent: 'right',
			}}
		>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Pets</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={pet}
					label='Pets'
					onChange={handleChange}
				>
					{pets.map((animal) => (
						<MenuItem key={uuidv4()} value={animal.id}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Avatar src={animal.img} />
								<Typography sx={{ marginLeft: '10px' }}>
									{animal.name}
								</Typography>
							</Box>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};
