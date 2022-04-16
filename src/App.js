import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaretakerProfile from './components/CaretakerProfile';
import NavBar from './components/NavBar/NavBar';
import { Home } from './components/Home/Home.jsx';
import TestCloudinary from './components/TestCloudinary';

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/caretaker/:id' element={<CaretakerProfile />} />
          {/* <Route exact path='/caretaker/:id' element={<Detail />} /> */}
          <Route exact path='/test/cloudinary' element={<TestCloudinary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
