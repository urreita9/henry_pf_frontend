import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCaretakerDetails } from '../../redux/actions/actions';
import Questions from '../Questions';
import CaretakerDescription from '../CaretakerDescription';

const CaretakerProfile = () => {
  const caretakerProfile = useSelector((state) => state.caretakerProfile);
  const dispatch = useDispatch();
  const { questions } = caretakerProfile;

  useEffect(() => {
    dispatch(getCaretakerDetails(1));
  }, [dispatch]);

  return (
    <main
      style={{
        paddingRight: 50,
        paddingLeft: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: 50,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CaretakerDescription {...caretakerProfile} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 200,
        }}
      >
        <Questions questions={questions} />

        <div>
          <h2>Calendario</h2>
        </div>
      </div>
    </main>
  );
};

export default CaretakerProfile;
