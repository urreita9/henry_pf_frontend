import axios from 'axios';
import imgPrueba from '../../utils/FoodNotFound.png';
//export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_CARETAKER_DETAILS = 'GET_CARETAKER_DETAILS';
export const POST_CARETAKER_QUESTION = 'POST_CARETAKER_QUESTION';

// export const getAllRecipes = () => async (dispatch) => {
//   try {
//     const payload = await axios.get('http://localhost:3001/');

//     dispatch({
//       type: GET_ALL_RECIPES,
//       payload: payload.data,
//     });
//   } catch (error) {
//     alert(error);
//   }
// };

export const getCaretakerDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/caretaker/${id}`);

    // const payload = {
    //   name: 'Juan Carlos',
    //   img: imgPrueba,
    //   description:
    //     'Soy Juan, me gustan los perros, cuido chicos, medianos, grandes, etc etc Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sit, maiores neque rerum nulla aspernatur dolore provident consectetur dolores harum numquam vitae necessitatibus fugit, iusto pariatur illo eligendi autem iure.',
    //   rating: 3,
    //   questions: [
    //     {
    //       id: 1,
    //       question: 'Buenas, paseas perros grandes o solo chicos?',
    //       answer: 'Yes',
    //     },
    //     {
    //       id: 2,
    //       question: 'Te lo puedo dejar a las 15hs?',
    //       answer: 'Si podés pasate a las 16hs',
    //     },
    //     {
    //       id: 3,
    //       question: 'Podría llevarte la comida que come Firulais?',
    //       answer: 'No',
    //     },
    //   ],
    // };

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
