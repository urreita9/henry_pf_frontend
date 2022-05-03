import React from 'react';
import { hourMonth } from '../../utils/hourMonth';

export const IncomingMsg = ({ msg }) => {
	return (
		<div className='incoming_msg'>
			<div className='received_msg'>
				<div className='received_withd_msg'>
					<p>{msg.mensaje}</p>
					<span className='time_date'>{hourMonth(msg.createAt)}</span>
				</div>
			</div>
		</div>
	);
};
