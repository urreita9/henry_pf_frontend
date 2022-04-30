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
} from '../actions/operationActions';

const initialState = {
  operations: [],
  filteredOperations: [],
  createdOperation: {},
  operation: {},
  allOperationsAdmins: []
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
        operation: payload,
      };
    case CAPTURE_OPERATION:
      return {
        ...state,
        operation: payload,
      };
    case SELECT_OPERATION:
      const myOperation = state.operations.find(
        (op) => op.operation.id === payload.id
      );

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
    case CLEAR_OPERATIONS:
      return {
        ...state,
        operations: payload,
        filteredOperations: payload,
      };
    case GET_ALL_OPERATIONS:
      return  {
        ...state,
        allOperationsAdmins: payload
      }
    default:
      return state;
  }
};

export default operationsReducer;
