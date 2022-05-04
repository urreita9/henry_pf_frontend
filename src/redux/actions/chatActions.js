import api from '../../axios/index';
export const GET_CHATS = 'GET_CHATS';
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT';
export const GET_MESSAGES = 'GET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const CLEAR_CHAT = 'CLEAR_CHAT';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

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

export const clearChat = () => ({
    type: CLEAR_CHAT,
    payload: null,
});

export const addNotification = (notification) => ({
    type: ADD_NOTIFICATION,
    payload: notification,
});

export const addNotificationHelper = (chats = [], notificacion) => {
    const nuevosChats = chats.map((el) => {
        if (el.chatId === notificacion.chatId) {
            el.notifications.push(notificacion);
            return el;
        } else return el;
    });

    return nuevosChats;
};

export const clearNotification = (chatId) => ({
    type: CLEAR_NOTIFICATIONS,
    payload: chatId,
});

export const clearNotificationHelper = (chats = [], chatId) => {
    const nuevosChats = chats.map((el) => {
        if (el.chatId === chatId) {
            el.notifications = []
            return el;
        } else return el;
    });

    return nuevosChats;
};
