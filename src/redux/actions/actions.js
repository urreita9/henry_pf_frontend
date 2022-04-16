import axios from 'axios';
export const GET_CARETAKERS = 'GET_CARETAKERS';
export const GET_CARETAKER_DETAILS = 'GET_CARETAKER_DETAILS';
export const POST_CARETAKER_QUESTION = 'POST_CARETAKER_QUESTION';
export const FILTER_BY_PET = 'FILTER_BY_PET';
export const GET_USER = 'GET_USER';

export const SET_THEME_MODE = "SET_THEME_MODE"

export const getCaretakers = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`http://localhost:3001/api/caretakers/`);

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
		const { data } = await axios.get(
			`http://localhost:3001/api/caretakers/${id}`
		);

		dispatch({
			type: GET_CARETAKER_DETAILS,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const postCaretakerQuestion = (id, question) => async (dispatch) => {
	try {
		const { data } = await axios.post(
			`http://localhost:3001/api/caretakers/question/${id}`,
			{
				question,
			}
		);

		dispatch({
			type: POST_CARETAKER_QUESTION,
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
        const { data } = await axios.get(`http://localhost:3001/api/users/${id}`);

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