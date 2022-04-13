import { GET_CARETAKER_DETAILS, POST_CARETAKER_QUESTION } from '../actions';

const initialState = {
  caretakerProfile: {},
};

const caretakerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // case GET_POKEMONS:
    // 	let takeOutPrevDb = state.pokemons.filter(
    // 		(pokemon) => pokemon.createdDb === false
    // 	);

    // 	return {
    // 		...state,
    // 		pokemons: [...takeOutPrevDb, ...payload],
    // 		filteredPokemons: [...takeOutPrevDb, ...payload],
    // 	};
    case GET_CARETAKER_DETAILS:
      return {
        ...state,
        caretakerProfile: payload,
      };

    case POST_CARETAKER_QUESTION:
      return {
        ...state,
        caretakerProfile: payload,
      };

    default:
      return state;
  }
};

export default caretakerReducer;
