import React, { useContext } from 'react';
// import { ChatContext } from '../context/chat/ChatContext';
// import { fetchWithToken } from '../helpers/fetch';
// import { scrollToBottom } from '../helpers/scrollToBottom';
// import { LOAD_MESSAGES, SELECT_CHAT } from '../types/types';

export const SideBarChatItem = ({ user }) => {
	// const { name, online } = user;
	// const { chatState, dispatch } = useContext(ChatContext);

	// const { activeChat } = chatState;
	const selectChat = async () => {
		// dispatch({
		// 	type: SELECT_CHAT,
		// 	payload: user.uid,
		// });
		// const res = await fetchWithToken(`messages/${user.uid}`);
		// dispatch({
		// 	type: LOAD_MESSAGES,
		// 	payload: res.messages,
		// });
		// scrollToBottom('messagesDiv');
	};
	return (
		<div
			className={
				`chat_list`
				//  ${activeChat === user.uid && 'active_chat'} `
			}
			onClick={selectChat}
		>
			<div className='chat_people'>
				<div className='chat_img'>
					<img
						src=' https://cdn-icons-png.flaticon.com/512/147/147144.png'
						alt='sunil'
					/>
				</div>
				<div className='chat_ib'>
					{/* <h5> */}
					{/* {name} */}
					{/* </h5> */}
					{/* {online ? ( */}
					<span className='text-success'>Online</span>
					{/* ) : ( */}
					<span className='text-danger'>Offline</span>
					{/* ) */}
					{/* } */}
				</div>
			</div>
		</div>
	);
};
