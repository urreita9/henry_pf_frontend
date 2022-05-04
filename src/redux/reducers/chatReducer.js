import {
    ADD_MESSAGE,
    CLEAR_CHAT,
    GET_CHATS,
    GET_MESSAGES,
    SET_ACTIVE_CHAT,
    ADD_NOTIFICATION,
    addNotificationHelper,
    CLEAR_NOTIFICATIONS,
    clearNotificationHelper,
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
            if (state.activeChat !== payload.chatId) return state;
            return { ...state, messages: [...state.messages, payload] };
        case CLEAR_CHAT:
            return {
                ...state,
                activeChat: '',
                activeUser: '',
                messages: [],
            };
        case ADD_NOTIFICATION:
            if (state.activeChat === action.payload.chatId) {
                
                return state;
            }
            const nuevoChats = addNotificationHelper(state.chats, action.payload);
            return {
                ...state,
                chats: nuevoChats,
            };
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                chats: clearNotificationHelper(state.chats, action.payload),
            };

        default:
            return state;
    }
};

export default chatReducer;
