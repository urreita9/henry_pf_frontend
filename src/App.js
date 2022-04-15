<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CaretakerProfile from "./components/CaretakerProfile";
import NavBar from "./components/NavBar/NavBar";

import { Home } from "./components/Home/Home";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";
import { LoginForm } from "./components/LoginForm/LoginForm";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/caretaker/:id" element={<CaretakerProfile />} />
          {/* <Route exact path='/caretaker/:id' element={<Detail />} /> */}
        </Routes>
      </Router>
    </>
  );
=======
import { CuidadorForm } from './components/Forms/CuidadorForm';

function App() {
	return <CuidadorForm />;
>>>>>>> cuidadorFormFrontEnd
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaretakerProfile from './components/CaretakerProfile';
import NavBar from './components/NavBar/NavBar';
import { Home } from './components/Home/Home.jsx';
import { Mapa } from './components/Map/Mapa';

function App() {
	return (
		<>
			<NavBar />
			<Router>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/map' element={<Mapa />} />
					<Route exact path='/caretaker/:id' element={<CaretakerProfile />} />
					{/* <Route exact path='/caretaker/:id' element={<Detail />} /> */}
				</Routes>
			</Router>
		</>
	);
>>>>>>> profileView
}

export default App;
