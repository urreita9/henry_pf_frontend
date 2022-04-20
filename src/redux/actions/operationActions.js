import api from '../../axios';
export const POST_OPERATION = 'POST_OPERATION';

export const SET_OPERATION = 'SET_OPERATION'; //MOMENTANEA

export const setOperation = (payload) => {
	// console.log(data);
	return {
		type: SET_OPERATION,
		payload,
	};
};
