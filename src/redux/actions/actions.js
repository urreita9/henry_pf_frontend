import api from '../../axios';
export const SET_THEME_MODE = 'SET_THEME_MODE';
export const GET_CARETAKERS = 'GET_CARETAKERS';
export const GET_CARETAKER_DETAILS = 'GET_CARETAKER_DETAILS';
export const POST_CARETAKER = 'POST_CARETAKER';
export const POST_CARETAKER_QUESTION = 'POST_CARETAKER_QUESTION';
export const EDIT_CARETAKER = 'EDIT_CARETAKER';
export const DELETE_CARETAKER = 'DELETE_CARETAKER';
export const CLEAN_CARETAKER = 'CLEAN_CARETAKER';
export const FILTER_BY_PET = 'FILTER_BY_PET';
export const POST_USER = 'POST_USER';
export const GET_USER = 'GET_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CLEAR_USER = 'CLEAR_USER';

export const getCaretakers = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/caretakers`);
    console.log(data);
    dispatch({
      type: GET_CARETAKERS,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const getCaretakerDetails = (id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/caretakers/${id}`);

    dispatch({
      type: GET_CARETAKER_DETAILS,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const postCaretaker = (careTaker) => async (dispatch) => {
  try {
    const { data } = await api.post(`/caretakers`, { ...careTaker });

    console.log(data);
    dispatch({
      type: POST_CARETAKER,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const postCaretakerQuestion = (id, question) => async (dispatch) => {
  try {
    const { data } = await api.post(`/caretakers/questions/${id}`, {
      question,
    });

    dispatch({
      type: POST_CARETAKER_QUESTION,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const editCaretaker = (id, caretaker) => async (dispatch) => {
  try {
    const { data } = await api.put(`/caretakers/${id}`, {
      caretaker,
    });

    dispatch({
      type: EDIT_CARETAKER,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const deleteCaretaker = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/caretakers/${id}`);

    dispatch({
      type: DELETE_CARETAKER,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const filterByPetSize = (payload) => ({
  type: FILTER_BY_PET,
  payload,
});

export const getUser = (token, id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/users/userjwt/jwt`, {
      headers: {
        'x-token': token,
        uid: id,
      },
    });

    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    const data = error.response;
    console.log('reducer getUser', data);
    dispatch({
      type: GET_USER,
      payload: data,
    });
  }
};

export default function setThemeMode(payload) {
  return {
    type: SET_THEME_MODE,
    payload,
  };
}

export const cleanCaretaker = () => ({
  type: CLEAN_CARETAKER,
  payload: null,
});

export const LoginAction = () => ({
  type: LOGIN,
  payload: null,
});

export const LogoutAction = () => ({
  type: LOGOUT,
  payload: null,
});

export const clearUser = () => ({
  type: CLEAR_USER,
  payload: {},
});
