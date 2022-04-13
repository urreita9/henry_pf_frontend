import axios from 'axios';
export const GET_CARETAKER_DETAILS = 'GET_CARETAKER_DETAILS';
export const POST_CARETAKER_QUESTION = 'POST_CARETAKER_QUESTION';

export const getCaretakerDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/caretaker/${id}`);

    dispatch({
      type: GET_CARETAKER_DETAILS,
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const postCaretakerQuestion = (id, question) => async (dispatch) => {
  try {
    const { data } = await axios.post(`http://localhost:3001/caretaker/${id}`, {
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
