// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Redirect,
// } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Questions from './components/Questions';
import CaretakerProfile from './components/CaretakerProfile';

// dotenv.config();

function App() {
  return (
    <Routes>
      <Route exact path='/cuidador/:id' element={<CaretakerProfile />} />
    </Routes>
  );
}

export default App;
