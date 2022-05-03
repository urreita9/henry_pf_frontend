import {
	ADD_MESSAGE,
	GET_CHATS,
	GET_MESSAGES,
	SET_ACTIVE_CHAT,
} from '../actions/chatActions';

const initialState = {
	chats: [],
	activeChat: '',
	activeUser: '',
	messages: [],
};
// const initialState = {
// 	uid: '',
// 	activeChat: null, // uid of user that will recieve my messages
// 	users: [], // all users
// 	messages: [], //selected chat
// };
const chatReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_CHATS:
			return { ...state, chats: [...payload] };
		case SET_ACTIVE_CHAT:
			if (state.activeChat === payload) return state;
			return {
				...state,
				activeChat: payload.chatId,
				activeUser: payload.user2Id,
			};
		case GET_MESSAGES:
			return { ...state, messages: [...payload] };
		case ADD_MESSAGE:
			return { ...state, messages: [...state.messages, payload] };
		default:
			return state;
	}
};

export default chatReducer;
