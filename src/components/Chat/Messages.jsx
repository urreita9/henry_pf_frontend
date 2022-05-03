import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
// import { AuthContext } from '../auth/AuthContext';
// import { ChatContext } from '../context/chat/ChatContext';
import { IncomingMsg } from './IncomingMsg';
import { OutGoingMsg } from './OutGoingMsg';
import { SendMessage } from './SendMessage';

export const Messages = () => {
	// const { chatState } = useContext(ChatContext);
	// const { auth } = useContext(AuthContext);
	const { messages } = useSelector((state) => state.chatReducer);
	const { user } = useSelector((state) => state.userReducer);

	return (
		<div className='mesgs'>
			<div id='messagesDiv' className='msg_history'>
				{messages?.map((msg) =>
					// msg.to === auth.uid ? (
					msg.de !== user.id ? (
						<IncomingMsg key={msg.id} msg={msg} />
					) : (
						<OutGoingMsg key={msg.id} msg={msg} />
					)
				)}
			</div>

			<SendMessage />
		</div>
	);
};
