import {
	SET_OPERATION,
	GET_USER_OPERATIONS,
	UPDATE_OP_STATUS,
} from '../actions/operationActions';

const initialState = {
	operations: [],
	filteredOperations: [],
	operation: {},
};

const operationsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_USER_OPERATIONS:
			return {
				...state,
				operations: payload,
				filteredOperations: payload,
			};
		case UPDATE_OP_STATUS:
			return {
				...state,
				operation: payload,
			};
		default:
			return state;
	}
};

export default operationsReducer;
