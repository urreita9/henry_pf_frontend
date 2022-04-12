// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Redirect,
// } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Questions from './components/Questions';
import CuidadorProfile from './components/CuidadorProfile';

// dotenv.config();

function App() {
  return (
    <Routes>
      <Route exact path='/cuidador/id' element={<CuidadorProfile />} />
    </Routes>
  );
}

export default App;
