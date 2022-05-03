import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { SideBarChatItem } from './SideBarChatItem';

export const SideBar = () => {
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => state.userReducer);
	const [state, setState] = useState({});
	const { chats } = useSelector((state) => state.chatReducer);

	useEffect(() => {
		if (user.id) {
			setLoading(true);
		}
	}, [user]);

	// console.log(user);
	return (
		<div className='inbox_chat'>
			{loading ? (
				<>
					{chats.map((chat) => (
						<SideBarChatItem key={chat.chatId} chat={chat} />
					))}
				</>
			) : (
				<p>loading...</p>
			)}
			<div className='extra_space'></div>
		</div>
	);
};
