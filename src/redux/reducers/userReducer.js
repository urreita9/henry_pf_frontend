import { CLEAR_PET, CLEAR_USER, CREATE_PET, EDIT_USER, GET_USER, LOGIN, LOGOUT } from '../actions/actions';

const initialState = {
    user: {},
    logged: false,
    pets: [],
    userCaretaker: {},
    pet: {},
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
                pets: payload.pets,
                userCaretaker: payload.caretaker,
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
                pets: [],
            };
        case EDIT_USER:
            return {
                ...state,
                user: payload,
                pets: payload.pets,
                userCaretaker: payload.caretaker,
            };
        case CLEAR_PET:
            return {
                ...state,
                pet: payload,
            };
        case CREATE_PET:
            return {
                ...state,
                pet: payload.pet,
                user: payload.user,
                pets: payload.user.pets,
            };

        default:
            return state;
    }
};

export default userReducer;
