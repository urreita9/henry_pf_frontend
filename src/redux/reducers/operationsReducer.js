import { SET_OPERATION } from '../actions/operationActions';

const initialState = {
	operations: [],
	filteredOperations: [],
	operation: {},
};

const operationsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_OPERATION:
			console.log('OP REDUCER', payload);
			return {
				...state,
				operation: payload,
			};
		default:
			return state;
	}
};

export default operationsReducer;
