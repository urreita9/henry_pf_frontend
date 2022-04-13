import { Routes, Route } from 'react-router-dom';
import CaretakerProfile from './components/CaretakerProfile';

function App() {
  return (
    <Routes>
      <Route exact path='/cuidador/:id' element={<CaretakerProfile />} />
    </Routes>
  );
}

export default App;
