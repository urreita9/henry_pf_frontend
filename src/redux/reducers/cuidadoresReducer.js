import {
	GET_CARETAKERS,
	GET_CARETAKER_DETAILS,
	POST_CARETAKER,
	POST_CARETAKER_QUESTION,
	EDIT_CARETAKER,
	DELETE_CARETAKER,
	FILTER_BY_PET,
	POST_USER,
} from '../actions/actions';

const initialState = {
	caretakers: [],
	filteredCaretakers: [],
	cuidador: {},
	caretakerProfile: {},
};

const cuidadoresReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case FILTER_BY_PET:
			let filterBySize = state.caretakers.filter(
				(cuidador) => cuidador.size >= Number(payload.size)
			);

			let filterByPrice = filterBySize.filter(
				(cuidador) =>
					cuidador.price >= payload.price[0] &&
					cuidador.price <= payload.price[1]
			);
			// console.log('reducer by price', filterByPrice);

			let filterByRating = filterByPrice.filter(
				(cuidador) => cuidador.rating >= payload.rating
			);
			// console.log('reducer by rating', filterByRating);

			return {
				...state,
				filteredCaretakers: [...filterByRating],
			};

		case GET_CARETAKERS:
			return {
				...state,
				caretakers: payload,
				filteredCaretakers: payload,
			};

		case GET_CARETAKER_DETAILS:
			return {
				...state,
				caretakerProfile: payload,
			};

		case POST_CARETAKER:
			return {
				...state,
				caretakerProfile: payload,
			};

		case POST_CARETAKER_QUESTION:
			return {
				...state,
				caretakerProfile: payload,
			};

		case EDIT_CARETAKER:
			return {
				...state,
				caretakerProfile: payload,
			};

		case DELETE_CARETAKER:
			return {
				...state,
				caretakers: payload,
			};

		case POST_USER:
			return {
				...state,
			};

		default:
			return state;
	}
};

export default cuidadoresReducer;
