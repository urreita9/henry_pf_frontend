import React, { useContext } from 'react';
// import { AuthContext } from '../auth/AuthContext';
// import { ChatContext } from '../context/chat/ChatContext';
import { IncomingMsg } from './IncomingMsg';
import { OutGoingMsg } from './OutGoingMsg';
import { SendMessage } from './SendMessage';

export const Messages = () => {
	// const { chatState } = useContext(ChatContext);
	// const { auth } = useContext(AuthContext);

	const arr = [1, 2, 3, 4, 5, 6, 7];
	return (
		<div className='mesgs'>
			<div id='messagesDiv' className='msg_history'>
				{arr.map((msg) =>
					// msg.to === auth.uid ? (
					msg % 2 === 0 ? (
						<IncomingMsg key={msg} msg={msg} />
					) : (
						<OutGoingMsg key={msg} msg={msg} />
					)
				)}
			</div>

			<SendMessage />
		</div>
	);
};
