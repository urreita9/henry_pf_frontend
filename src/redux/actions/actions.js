import api from '../../axios';
export const SET_THEME_MODE = 'SET_THEME_MODE';
export const GET_CARETAKERS = 'GET_CARETAKERS';
export const GET_CARETAKER_DETAILS = 'GET_CARETAKER_DETAILS';
export const POST_CARETAKER = 'POST_CARETAKER';
export const POST_CARETAKER_QUESTION = 'POST_CARETAKER_QUESTION';
export const EDIT_CARETAKER = 'EDIT_CARETAKER';
export const DELETE_CARETAKER = 'DELETE_CARETAKER';
export const CLEAN_CARETAKER = 'CLEAN_CARETAKER';
export const FILTER_BY_PET = 'FILTER_BY_PET';
export const POST_USER = 'POST_USER';

export const getCaretakers = () => async (dispatch) => {
	try {
		const { data } = await api.get(`/caretakers`);

		dispatch({
			type: GET_CARETAKERS,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const getCaretakerDetails = (id) => async (dispatch) => {
	try {
		const { data } = await api.get(`/caretakers/${id}`);

		dispatch({
			type: GET_CARETAKER_DETAILS,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const postCaretaker = () => async (dispatch) => {
	try {
		const { data } = await api.post(`/caretakers`);

		dispatch({
			type: POST_CARETAKER,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const postCaretakerQuestion = (id, question) => async (dispatch) => {
	try {
		const { data } = await api.post(`/caretakers/question/${id}`, {
			question,
		});

		dispatch({
			type: POST_CARETAKER_QUESTION,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const editCaretaker = (id, caretaker) => async (dispatch) => {
	try {
		const { data } = await api.put(`/caretakers/${id}`, {
			caretaker,
		});

		dispatch({
			type: EDIT_CARETAKER,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const deleteCaretaker = (id) => async (dispatch) => {
	try {
		const { data } = await api.delete(`/caretakers/${id}`);

		dispatch({
			type: DELETE_CARETAKER,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const filterByPetSize = (payload) => ({
	type: FILTER_BY_PET,
	payload,
});

export const getUser = (id) => async (dispatch) => {
	try {
		const { data } = await api.get(`/users/${id}`);

		dispatch({
			type: GET_USER,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export default function setThemeMode(payload) {
	return {
		type: SET_THEME_MODE,
		payload,
	};
}

export const cleanCaretaker = () => ({
	type: CLEAN_CARETAKER,
	payload: null,
});
