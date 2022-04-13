import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postCaretakerQuestion } from '../../redux/actions/actions';
import Question from '../Question';

const Questions = ({ questions }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [input, setInputQuestion] = useState({
    question: '',
  });

  const handleOnChange = (e) => {
    //console.log(input);
    setInputQuestion({ ...input, question: e.target.value });
  };

  const handleOnClick = (e) => {
    //llamar a action para crear estado nuevo en reducer
    dispatch(postCaretakerQuestion(id, input.question));
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
        {questions?.map((r) => (
          <Question key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
