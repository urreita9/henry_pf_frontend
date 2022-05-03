import { Avatar } from '@mui/material';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMessages,
	setActiveUser,
	SET_ACTIVE_CHAT,
} from '../../redux/actions/chatActions';
import { capitalize } from '../../utils/functions';
// import { ChatContext } from '../context/chat/ChatContext';
// import { fetchWithToken } from '../helpers/fetch';
// import { scrollToBottom } from '../helpers/scrollToBottom';
// import { LOAD_MESSAGES, SELECT_CHAT } from '../types/types';

export const SideBarChatItem = ({ chat }) => {
	const { user2, chatId } = chat;
	const dispatch = useDispatch();
	const { activeChat } = useSelector((state) => state.chatReducer);

	// const { activeChat } = chatState;
	const selectChat = async () => {
		dispatch(setActiveUser(chatId, user2.id));
		// const res = await fetchWithToken(`messages/${user.uid}`);
		dispatch(getMessages(chatId));
		// scrollToBottom('messagesDiv');
	};
	return (
		<div
			className={`chat_list ${activeChat === chatId && 'active_chat'} `}
			onClick={selectChat}
		>
			<div className='chat_people'>
				<div className='chat_img'>
					<Avatar src={user2.img} alt='sunil' />
				</div>
				<div className='chat_ib'>
					<h5>
						{capitalize(user2.name)} {capitalize(user2.lastname)}
					</h5>
					{user2.online ? (
						<span className='text-success'>Online</span>
					) : (
						<span className='text-danger'>Offline</span>
					)}
				</div>
			</div>
		</div>
	);
};
