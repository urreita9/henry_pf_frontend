export const FILTER_BY_PET = 'FILTER_BY_PET';

export const filterByPetSize = (payload) => ({
	type: FILTER_BY_PET,
	payload,
});
