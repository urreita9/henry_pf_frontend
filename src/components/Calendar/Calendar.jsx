import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
export const Calendar = () => {
	const [state, setState] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: 'selection',
		},
	]);
	return (
		<DateRange
			editableDateInputs={true}
			onChange={(item) => setState([item.selection])}
			moveRangeOnFirstSelection={false}
			ranges={state}
		/>
	);
};
