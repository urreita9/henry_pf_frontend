import api from '../../axios';
export const POST_OPERATION = 'POST_OPERATION';
export const GET_USER_OPERATIONS = 'GET_USER_OPERATIONS';
export const UPDATE_OP_STATUS = 'UPDATE_OP_STATUS';

export const SET_OPERATION = 'SET_OPERATION'; //MOMENTANEA
export const CAPTURE_OPERATION = 'CAPTURE_OPERATION';
export const SELECT_OPERATION = 'SELECT_OPERATION';
export const FILTER_BY_DATE = 'FILTER_BY_DATE';

export const getUserOperations = (uid, token, user) => async (dispatch) => {
	try {
		const { data } = await api.get(`/operations?user=${user}`, {
			headers: {
				'x-token': token,
				uid,
			},
		});

		if (data.length) {
			dispatch({
				type: GET_USER_OPERATIONS,
				payload: data,
			});
		}
	} catch (error) {
		alert(error);
	}
};

export const updateOpStatus =
	(idOperation, idPayment, token) => async (dispatch) => {
		try {
			const { data } = await api.put(
				`/operations`,
				{ idOperation, idPayment },
				{
					headers: {
						'x-token': token,
					},
				}
			);

			dispatch({
				type: UPDATE_OP_STATUS,
				payload: data,
			});
		} catch (error) {
			alert(error);
		}
	};

// export const setOperation = (payload) => {
//   // console.log(data);
//   return {
//     type: SET_OPERATION,
//     payload,
//   };
// };

export const setOperation =
	({ id, totalCheckout, timeLapse, uid, pet }) =>
	async (dispatch) => {
		try {
			const { data } = await api.post('/operations/create-order', {
				id,
				totalCheckout,
				timeLapse,
				petId: pet,
				headers: {
					uid,
				},
			});
			dispatch({
				type: SET_OPERATION,
				payload: data,
			});

			window.location.href = data.links[1].href;
		} catch (error) {
			alert(error);
		}
	};

export const captureOperation = (token, PayerID) => async (dispatch) => {
	try {
		const { data } = await api.get(
			`/operations/capture-order?token=${token}&PayerID=${PayerID}`
		);
		console.log('ACTION CAPTURE', data);
		dispatch({
			type: CAPTURE_OPERATION,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const selectOperation = (id, user) => ({
	type: SELECT_OPERATION,
	payload: { id, user },
});

export const filterByDate = (days) => ({
	type: FILTER_BY_DATE,
	payload: days,
});
