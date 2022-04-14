import { Rating } from '@mui/material';

const CaretakerDescription = ({ name, description, rating }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img
          src='img'
          alt='img'
          style={{
            width: 200,
            height: 200,
          }}
        />
        <div>
          <p>{name}</p>
          <p> {description} </p>
        </div>
      </div>
      <div>
        <Rating
          name='half-rating-read'
          value={rating || 0}
          precision={0.5}
          readOnly
        />
      </div>
    </>
  );
};

export default CaretakerDescription;
