import { GET_USER } from '../actions/actions';

const initialState = {
    user: {},
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_USER:
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
};

export default userReducer;
