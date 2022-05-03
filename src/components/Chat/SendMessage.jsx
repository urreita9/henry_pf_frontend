import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
// import { AuthContext } from '../auth/AuthContext';
// import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../../context/SocketContext';

export const SendMessage = () => {
	const { socket } = useContext(SocketContext);
	const { user } = useSelector((state) => state.userReducer);
	const { activeChat, activeUser } = useSelector((state) => state.chatReducer);
	const [msg, setMsg] = useState('');
	const onChange = (e) => {
		setMsg(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (!msg.length) return;

		socket.emit('personal-message', {
			de: user.id,
			para: activeUser,
			mensaje: msg,
			chatId: activeChat,
			createAt: new Date(),
		});

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
						autoComplete='off'
					/>
				</div>
				<div className='col-sm-3 text-center'>
					<button className='msg_send_btn mt-3' type='submit'>
						Send
					</button>
				</div>
			</div>
		</form>
	);
};
