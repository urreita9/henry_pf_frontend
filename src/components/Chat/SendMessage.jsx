import React, { useContext, useState } from 'react';
// import { AuthContext } from '../auth/AuthContext';
// import { ChatContext } from '../context/chat/ChatContext';
// import { SocketContext } from '../context/SocketContext';

export const SendMessage = () => {
	// const { socket } = useContext(SocketContext);
	// const { auth } = useContext(AuthContext);
	// const { chatState } = useContext(ChatContext);
	const [msg, setMsg] = useState('');
	const onChange = (e) => {
		setMsg(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (!msg.length) return;

		// socket.emit('personal-message', {
		// 	from: auth.uid,
		// 	to: chatState.activeChat,
		// 	message: msg,
		// });

		setMsg('');
	};
	return (
		<form onSubmit={onSubmit}>
			<div className='type_msg row'>
				<div className='input_msg_write col-sm-9'>
					<input
						type='text'
						className='write_msg'
						placeholder='Message...'
						name='msg'
						value={msg}
						onChange={onChange}
					/>
				</div>
				<div className='col-sm-3 text-center'>
					<button className='msg_send_btn mt-3' type='submit'>
						send
					</button>
				</div>
			</div>
		</form>
	);
};
