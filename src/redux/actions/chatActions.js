import api from '../../axios/index';
export const GET_CHATS = 'GET_CHATS';
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT';
export const GET_MESSAGES = 'GET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const getChats = (payload) => ({
	type: GET_CHATS,
	payload,
});

export const setActiveUser = (chatId, user2Id) => ({
	type: SET_ACTIVE_CHAT,
	payload: {
		chatId,
		user2Id,
	},
});

export const getMessages = (chatId) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const { data } = await api.get(`/chats/${chatId}`, {
			headers: { 'x-token': token },
		});

		dispatch({
			type: GET_MESSAGES,
			payload: data.chat.messages,
		});
	} catch (error) {
		console.log(error);
	}
};

export const addMessage = (payload) => ({
	type: ADD_MESSAGE,
	payload,
});
