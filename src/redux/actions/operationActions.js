import api from '../../axios';
export const POST_OPERATION = 'POST_OPERATION';
export const GET_USER_OPERATIONS = 'GET_USER_OPERATIONS';
export const UPDATE_OP_STATUS = 'UPDATE_OP_STATUS';
export const GET_CARETAKER_OPERATIONS = 'GET_CARETAKER_OPERATIONS';
export const SET_OPERATION = 'SET_OPERATION'; //MOMENTANEA
export const CAPTURE_OPERATION = 'CAPTURE_OPERATION';
export const SELECT_OPERATION = 'SELECT_OPERATION';
export const FILTER_BY_DATE = 'FILTER_BY_DATE';
export const CLEAR_OPERATIONS = 'CLEAR_OPERATIONS';
export const GET_ALL_OPERATIONS = 'GET_ALL_OPERATIONS';

export const getUserOperations = (uid, token) => async (dispatch) => {
	try {
		const { data } = await api.get(`/operations?user=true`, {
			headers: {
				'x-token': token,
				uid,
			},
		});

		//if (data.length) {
		dispatch({
			type: GET_USER_OPERATIONS,
			payload: data,
		});
		//}
	} catch (error) {
		alert(error);
	}
};

export const getCaretakerOperations = (uid, token) => async (dispatch) => {
	try {
		const { data } = await api.get(`/operations?user=false}`, {
			headers: {
				'x-token': token,
				uid,
			},
		});

		//if (data.length) {
		dispatch({
			type: GET_CARETAKER_OPERATIONS,
			payload: data,
		});
		//}
	} catch (error) {
		alert(error);
	}
};
export const getAllOperations = (token, uid) => async (dispatch) => {
	try {
		const { data } = await api.get(`/operations/all`, {
			headers: {
				'x-token': token,
				uid,
			},
		});

		dispatch({
			type: GET_ALL_OPERATIONS,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const updateOperationStatus =
	(token, uid, operationId) => async (dispatch) => {
		try {
			const { data } = await api.put(
				'/operations',
				{ operationId },
				{
					headers: {
						'x-token': token,
						uid,
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
	({ id, totalCheckout, timeLapse, uid, pet, startDate, endDate, user }) =>
	async (dispatch) => {
		try {
			const { data } = await api.post('/operations/create-order', {
				id,
				totalCheckout,
				timeLapse,
				petId: pet,
				startDate,
				endDate,
				headers: {
					uid,
				},
			});
			dispatch({
				type: SET_OPERATION,
				payload: data,
			});
			const token = localStorage.getItem('token');

			const isMap = user.chats.find((chat) => chat.user2.id === id);
			if (!isMap) {
				await api.post(
					'/chats',
					{ user1: uid, user2: id },
					{
						headers: {
							'x-token': token,
						},
					}
				);
			}

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
		//console.log('ACTION CAPTURE', data);
		dispatch({
			type: CAPTURE_OPERATION,
			payload: data,
		});
	} catch (error) {
		alert(error);
	}
};

export const selectOperation = (id, user, isCaretaker = true) => {
	console.log('SELECT OPERATION', user);
	return {
		type: SELECT_OPERATION,
		payload: { id, user, isCaretaker },
	};
};

export const filterByDate = (days) => ({
	type: FILTER_BY_DATE,
	payload: days,
});

export const clearOperations = () => ({
	type: CLEAR_OPERATIONS,
	payload: [],
});

export const finishOperation =
	(uid, operationId, user = true) =>
	async (dispatch) => {
		const token = localStorage.getItem('token');
		try {
			const { data } = await api.put(
				`/operations/${operationId}?user=${user}`,
				{
					headers: {
						'x-token': token,
						uid,
					},
				}
			);
			dispatch({
				type: GET_ALL_OPERATIONS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
