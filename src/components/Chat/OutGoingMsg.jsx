import React from 'react';
import { hourMonth } from '../../utils/hourMonth';

export const OutGoingMsg = ({ msg }) => {
	return (
		<div className='outgoing_msg'>
			<div className='sent_msg'>
				<p>{msg.mensaje}</p>
				<span className='time_date'>{hourMonth(msg.createAt)}</span>
			</div>
		</div>
	);
};
