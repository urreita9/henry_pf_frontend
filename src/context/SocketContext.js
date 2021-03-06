import { createContext, useEffect } from 'react';

import { useSocket } from '../hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import {
	addMessage,
	addNotification,
	getChats,
} from '../redux/actions/chatActions';
import {
	scrollToBottom,
	scrollToBottomAnimated,
} from '../utils/scrollToBottom';

export const SocketContext = createContext();

const URL = process.env.REACT_APP_URL;

export const SocketProvider = ({ children }) => {
	const { socket, online, conectarSocket, desconectarSocket } = useSocket(URL);

	const { logged, user } = useSelector((state) => state.userReducer);

	const { messages, activeChat } = useSelector((state) => state.chatReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		if (logged) {
			conectarSocket();
		}
	}, [logged]);

	useEffect(() => {
		if (!logged) {
			desconectarSocket();
		}
	}, [logged]);

	useEffect(() => {
		socket?.on('chats', (chats) => {
			dispatch(getChats(chats));
		});
	}, [socket, dispatch]);

	useEffect(() => {
		socket?.on('actualizate-perro', (payload) => {
			dispatch(getChats(payload));
		});
	}, [socket, dispatch]);

	useEffect(() => {
		socket?.on('personal-message', (payload) => {
			dispatch(addMessage(payload));
		});
	}, [socket, dispatch]);
	useEffect(() => {
		if (messages.length > 0) {
			scrollToBottom('messagesDiv');
		}
	}, [messages]);

	useEffect(() => {
		socket?.on('nueva-notificacion', (payload) => {
			dispatch(addNotification(payload));
		});
	}, [socket]);

	// useEffect(() => {
	//     socket?.on('mensaje-personal', (mensaje) => {
	//         dispatch({
	//             type: types.nuevoMensaje,
	//             payload: mensaje,
	//         });

	//         scrollToBottomAnimated('mensajes');
	//     });
	// }, [socket, dispatch]);

	return (
		<SocketContext.Provider value={{ socket, online }}>
			{children}
		</SocketContext.Provider>
	);
};
