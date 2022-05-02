import React, { useContext } from 'react';
// import { ChatContext } from '../context/chat/ChatContext';
// import { AuthContext } from '../auth/AuthContext';
import { SideBarChatItem } from './SideBarChatItem';

export const SideBar = () => {
	// const { chatState } = useContext(ChatContext);
	// const { auth } = useContext(AuthContext);

	const arr = [1, 2, 3, 4, 5, 6];
	return (
		<div className='inbox_chat'>
			{arr
				// .filter((user) => user.uid !== auth.uid)
				.map((user) => (
					<SideBarChatItem key={user} user={user} />
				))}
			<div className='extra_space'></div>
		</div>
	);
};
