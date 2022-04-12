import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from '../Question';

const Questions = () => {
  //questions viene de un estado en redux
  //Ejemplo moke
  const questions = [
    {
      id: 1,
      question: 'Buenas, paseas perros grandes?',
      answer: 'Yes',
    },
    {
      id: 2,
      question: 'Te lo puedo dejar a las 15hs?',
      answer: 'Si podés pasate a las 16hs',
    },
    {
      id: 3,
      question: 'Podría llevarte la comida que come Firulais?',
      answer: 'No',
    },
  ]; //useSelector(state => state.questions)

  //const dispatch = useDispatch();

  const [input, setInputQuestion] = useState({
    question: '',
  });

  const handleOnChange = (e) => {
    //console.log(input);
    setInputQuestion({ ...input, question: e.target.value });
  };

  const handleOnClick = (e) => {
    //llamar a action para crear estado nuevo en reducer
    //dispatch(postQuestion(input.question))
    //console.log(input.question);
    setInputQuestion({ question: '' });
  };

  return (
    <div>
      <div>
        <textarea
          name='question'
          id='question'
          cols='60'
          rows='6'
          style={{ resize: 'none' }}
          value={input.question}
          onChange={handleOnChange}
        ></textarea>
        <button onClick={handleOnClick}>Preguntar</button>
      </div>
      <div>
        {questions.map((r) => (
          <Question key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
