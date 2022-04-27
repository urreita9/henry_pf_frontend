import { GET_ALL_USERS, FILTERED_USERS } from '../actions/adminActions';

const initialState = {
    users: [],
    filteredUsers: [],
};

const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: payload,
                filteredUsers: payload,
            };
        case FILTERED_USERS:
            return {
                ...state,
                filteredUsers: payload,
            };

        default:
            return state;
    }
};

export default adminReducer;
