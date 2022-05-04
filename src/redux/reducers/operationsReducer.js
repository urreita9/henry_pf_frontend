import { differenceInCalendarDays } from 'date-fns';
import {
	SET_OPERATION,
	GET_USER_OPERATIONS,
	UPDATE_OP_STATUS,
	CAPTURE_OPERATION,
	SELECT_OPERATION,
	FILTER_BY_DATE,
	CLEAR_OPERATIONS,
	GET_ALL_OPERATIONS,
	GET_CARETAKER_OPERATIONS,
	FILTER_BY_DATE_CARETAKER,
} from '../actions/operationActions';

const initialState = {
	operations: [],
	filteredOperations: [],
	caretakerOperations: [],
	createdOperation: {},
	operation: {},
	//allOperationsAdmins: []
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
		case SET_OPERATION:
			return {
				...state,
				createdOperation: payload,
			};
		case UPDATE_OP_STATUS:
			return {
				...state,
				operations: payload,
			};
		case CAPTURE_OPERATION:
			return {
				...state,
				operation: payload,
			};
		case SELECT_OPERATION:
			let myOperation;
			if (!payload.isCaretaker) {
				myOperation = state.caretakerOperations.find(
					(op) => op.operation.id === payload.id
				);
			} else {
				myOperation = state.operations.find(
					(op) => op.operation.id === payload.id
				);
			}

			return {
				...state,
				operation: { ...myOperation, user: payload.user },
			};
		case FILTER_BY_DATE:
			if (payload === 0) {
				return {
					...state,
					filteredOperations: state.operations,
				};
			}
			const filterByDate = state.operations.filter((op) => {
				const time = differenceInCalendarDays(
					new Date(),
					new Date(op.operation.createdAt)
				);
				if (time <= payload) {
					return op;
				}
			});
			return { ...state, filteredOperations: filterByDate };

		case FILTER_BY_DATE_CARETAKER:
			if (payload === 0) {
				return {
					...state,
					filteredOperations: state.operations,
				};
			}
			const filterByDateCaretaker = state.caretakerOperations.filter((op) => {
				const time = differenceInCalendarDays(
					new Date(),
					new Date(op.operation.createdAt)
				);
				if (time <= payload) {
					return op;
				}
			});
			return { ...state, caretakerOperations: filterByDateCaretaker };
		case CLEAR_OPERATIONS:
			return {
				...state,
				operations: payload,
				filteredOperations: payload,
			};
		case GET_ALL_OPERATIONS:
			return {
				...state,
				//allOperationsAdmins: payload,
				operations: payload,
			};
		case GET_CARETAKER_OPERATIONS:
			return { ...state, caretakerOperations: [...payload] };
		default:
			return state;
	}
};

export default operationsReducer;
