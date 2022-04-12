import Questions from '../Questions';
import img from '../../utils/FoodNotFound.png';

const CaretakerProfile = () => {
  return (
    <main style={{ paddingRight: 50, paddingLeft: 50 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img
          src={img}
          alt='img'
          style={{
            width: 200,
            height: 200,
          }}
        />
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            veritatis, hic assumenda fugiat harum magnam laborum id esse
            consectetur doloremque ut molestiae illum. Aliquam non eos, tenetur
            nobis dolorem consectetur.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 200,
        }}
      >
        <Questions />

        <div>
          <h2>Calendario</h2>
        </div>
      </div>
    </main>
  );
};

export default CaretakerProfile;
