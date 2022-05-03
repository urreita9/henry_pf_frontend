import moment from 'moment';
export const hourMonth = (date) => {
	const time = moment(date);

	return time.format('HH:mm a | MMMM Do');
};
