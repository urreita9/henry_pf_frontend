import api from '../../axios';
export const POST_OPERATION = 'POST_OPERATION';
export const GET_USER_OPERATIONS = 'GET_USER_OPERATIONS';
export const UPDATE_OP_STATUS = 'UPDATE_OP_STATUS';

export const SET_OPERATION = 'SET_OPERATION'; //MOMENTANEA

export const getUserOperations = (id, user) => async (dispatch) => {
	try {
		const { data } = await api.get(`/operations/${id}?user=${user}`);
		console.log(data);
		dispatch({
			type: GET_USER_OPERATIONS,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const updateOpStatus = (id, status) => async (dispatch) => {
	try {
		const { data } = await api.put(`/operations`, { id, status });

		dispatch({
			type: UPDATE_OP_STATUS,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const setOperation = (payload) => {
	// console.log(data);
	return {
		type: SET_OPERATION,
		payload,
	};
};
