import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
export const Calendar = ({ datesRange, setDatesRange }) => {
	return (
		<DateRange
			editableDateInputs={true}
			onChange={(item) => setDatesRange([item.selection])}
			moveRangeOnFirstSelection={false}
			ranges={datesRange}
		/>
	);
};
