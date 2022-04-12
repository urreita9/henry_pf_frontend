import {} from '../actions/actions';

const initialState = {
	cuidadores: [],
	cuidador: {},
};

const cuidadoresReducer = (state = initialState, action) => {
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

		default:
			return state;
	}
};

export default cuidadoresReducer;
