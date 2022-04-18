import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postCaretakerQuestion } from '../../redux/actions/actions';
import Question from '../Question';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const Questions = ({ questions }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [inputQuestion, setInputQuestion] = useState({
    question: '',
  });
  const { logged } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    //console.log(input);
    setInputQuestion({ ...inputQuestion, question: e.target.value });
  };

  const handleOnClick = (e) => {
    //llamar a action para crear estado nuevo en reducer
    dispatch(postCaretakerQuestion(id, inputQuestion.question));
    //console.log(input.question);
    setInputQuestion({ question: '' });
  };

  return (
    <Grid
      item
      xs={12}
      sx={{ marginBottom: 2, paddingX: 2, margin: '10px auto' }}
    >
      {isAdding ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1, borderColor: '#F29278' }}
            placeholder='New Question'
            autoFocus
            multiline
            label='New Question'
            helperText={
              !inputQuestion.length && 'Ask anything you like to your candidate'
            }
            // error={!inputQuestion.length && isTouched}
            value={inputQuestion.question}
            onChange={handleOnChange}
            rows={4}
            // onBlur={() => setIsTouched(true)}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button
              variant='text'
              onClick={() => {
                setIsAdding(false);
                setInputQuestion({ ...inputQuestion, question: '' });
                // setIsTouched(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              // endIcon={<QuestionMarkOutlinedIcon />}
              onClick={() => {
                if (!logged) {
                  navigate('/login');
                  return;
                }
                handleOnClick();
              }}
              sx={{
                borderColor: '#F29278',
                color: '#F29278',
              }}
            >
              ASK
              {/* <QuestionMarkOutlinedIcon sx={{ fontSize: 'medium' }} /> */}
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant='outlined'
          sx={{
            borderColor: '#F29278',
            color: '#F29278',
          }}
          onClick={() => setIsAdding(true)}
        >
          Ask a question to the caretaker!
        </Button>
      )}
      {/* <div>
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
			<div> */}
      {questions?.map((r) => (
        <Question key={r.id} {...r} />
      ))}
      {/* </div>  */}
    </Grid>
  );
};

export default Questions;
