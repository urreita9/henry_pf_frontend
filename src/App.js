import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaretakerProfile from './components/CaretakerProfile';
import NavBar from './components/NavBar/NavBar';
import { Mapa } from './components/Map/Mapa';
import { Home } from './components/Home/Home';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { LoginForm } from './components/LoginForm/LoginForm';
import { CuidadorForm } from './components/Forms/CuidadorForm';

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/map' element={<Mapa />} />
					<Route exact path='/register' element={<RegisterForm />} />
					<Route exact path='/login' element={<LoginForm />} />
					<Route exact path='/caretaker/:id' element={<CaretakerProfile />} />
					<Route exact path='/host' element={<CuidadorForm />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
