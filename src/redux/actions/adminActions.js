import api from '../../axios';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const FILTERED_USERS = 'FILTERED_USERS';

export const getAllUsers = (token) => async (dispatch) => {
    try {
        const { data } = await api.get(`/users/admin/users?token=${token}`);

        dispatch({
            type: GET_ALL_USERS,
            payload: data,
        });
    } catch (error) {
        console.log(error.data);
    }
};

export const toAdmin = (token, userId) => async (dispatch) => {
    try {
        await api.put(
            `/users/edit/beadmin`,
            { userId },
            {
                headers: {
                    'x-token': token,
                },
            }
        );

        const { data } = await api.get(`/users/admin/users?token=${token}`);

        dispatch({
            type: GET_ALL_USERS,
            payload: data,
        });
    } catch (error) {
        console.log(error.data);
    }
};

export const toUser = (token, userId) => async (dispatch) => {
    try {
        await api.put(
            `/users/edit/beuser`,
            { userId },
            {
                headers: {
                    'x-token': token,
                },
            }
        );

        const { data } = await api.get(`/users/admin/users?token=${token}`);

        dispatch({
            type: GET_ALL_USERS,
            payload: data,
        });
    } catch (error) {
        console.log(error.data);
    }
};

export const banUser = (token, userId) => async (dispatch) => {
    try {
        await api.put(
            `/users/edit/banuser`,
            { userId },
            {
                headers: {
                    'x-token': token,
                },
            }
        );

        const { data } = await api.get(`/users/admin/users?token=${token}`);

        dispatch({
            type: GET_ALL_USERS,
            payload: data,
        });
    } catch (error) {
        console.log(error.data);
    }
};

export const unBanUser = (token, userId) => async (dispatch) => {
    try {
        await api.put(
            `/users/edit/unbanuser`,
            { userId },
            {
                headers: {
                    'x-token': token,
                },
            }
        );

        const { data } = await api.get(`/users/admin/users?token=${token}`);

        dispatch({
            type: GET_ALL_USERS,
            payload: data,
        });
    } catch (error) {
        console.log(error.data);
    }
};
