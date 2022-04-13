import {
  GET_CARETAKER_DETAILS,
  POST_CARETAKER_QUESTION,
  FILTER_BY_PET,
} from '../actions/actions';

const data = [
  {
    id: 1,
    name: 'Juan',
    img: 'https://images.pexels.com/users/avatars/203572739/cristian-dario-565.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 9,
    lng: -58.4847,
    lat: -34.5909,
    rating: 5,
    size: 1,
  },
  {
    id: 2,
    name: 'Pedro',
    img: 'https://images.pexels.com/users/avatars/42373991/imzaar-292.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 17,
    lng: -58.4487,
    lat: -34.588,
    rating: 4,
    size: 1,
  },
  {
    id: 3,
    name: 'Ignacio',
    img: 'https://images.pexels.com/users/avatars/155326297/vladimir-konoplev-351.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 32,
    lng: -58.4484,
    lat: -34.5709,
    rating: 3.5,
    size: 2,
  },
  {
    id: 4,
    name: 'Mariano',
    img: 'https://images.pexels.com/users/avatars/133112242/sofi-832.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 27,
    lng: -58.4846,
    lat: -34.54159,
    rating: 4,
    size: 1,
  },
  {
    id: 5,
    name: 'Federico',
    img: 'https://images.pexels.com/users/avatars/3490295/justus-menke-389.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 24,
    lng: -58.4958,
    lat: -34.5116,
    rating: 3,
    size: 0,
  },
  {
    id: 6,
    name: 'Ana',
    img: 'https://images.pexels.com/users/avatars/2948812/billow926-585.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 51,
    lng: -58.507,
    lat: -34.4971,
    rating: 4.5,
    size: 2,
  },
  {
    id: 7,
    name: 'Maria',
    img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 43,
    lng: -58.5188,
    lat: -34.4784,
    rating: 5,
    size: 0,
  },
  {
    id: 8,
    name: 'Veronica',
    img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 28,
    lng: -58.5429,
    lat: -34.5343,
    rating: 3,
    size: 0,
  },
  {
    id: 9,
    name: 'Jorge',
    img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 120,
    lng: -58.5496,
    lat: -34.5776,
    rating: 4,
    size: 1,
  },
  {
    id: 10,
    name: 'Tomas',
    img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 67,
    lng: -58.5949,
    lat: -34.6596,
    rating: 5,
    size: 2,
  },
  {
    id: 11,
    name: 'Nicolas',
    img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 50,
    lng: -58.7735,
    lat: -34.5895,
    rating: 5,
    size: 0,
  },
  {
    id: 12,
    name: 'Giuliano',
    img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 14,
    lng: -60.6705,
    lat: -32.9461,
    rating: 2,
    size: 1,
  },
  {
    id: 13,
    name: 'Mariano',
    img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
    price: 92,
    lng: -65.1774,
    lat: -26.8303,
    rating: 5,
    size: 0,
  },
];

const initialState = {
  cuidadores: data,
  filteredCuidadores: data,
  cuidador: {},
  caretakerProfile: {},
};

const cuidadoresReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTER_BY_PET:
      let filterBySize = state.cuidadores.filter(
        (cuidador) => cuidador.size >= Number(payload.size)
      );

      let filterByPrice = filterBySize.filter(
        (cuidador) =>
          cuidador.price >= payload.price[0] &&
          cuidador.price <= payload.price[1]
      );
      console.log('reducer by price', filterByPrice);

      let filterByRating = filterByPrice.filter(
        (cuidador) => cuidador.rating >= payload.rating
      );
      console.log('reducer by rating', filterByRating);

      return {
        ...state,
        filteredCuidadores: [...filterByRating],
      };

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

export default cuidadoresReducer;
