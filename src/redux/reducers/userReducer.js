import { CLEAR_USER, GET_USER, LOGIN, LOGOUT } from '../actions/actions';

const initialState = {
    user: {},
    logged: false,
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
            };
        case LOGIN:
            return {
                ...state,
                logged: true,
            };
        case LOGOUT:
            return {
                ...state,
                logged: false,
            };
        case CLEAR_USER:
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
};

export default userReducer;
