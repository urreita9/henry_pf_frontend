import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from '../../utils/functions';

export const SearchBox = () => {
	const { user } = useSelector((state) => state.userReducer);
	return (
		<div className='headind_srch'>
			<div className='recent_heading mt-2'>
				<h4>
					{capitalize(user?.name)} {capitalize(user?.lastname)}
				</h4>
			</div>
			<div className='srch_bar'>
				<div className='stylish-input-group'></div>
			</div>
		</div>
	);
};
