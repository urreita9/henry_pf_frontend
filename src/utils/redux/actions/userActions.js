import axios from 'axios';

export const GET_USER = 'GET_USER';


export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/api/users/${id}`);

        dispatch({
            type: GET_USER,
            payload: data,
        });
    } catch (error) {
        alert(error);
    }
};
