import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Detail } from './components/Detail/Detail.jsx';
import { Home } from './components/Home/Home.jsx';

// dotenv.config();

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/caretaker/:id' element={<Detail />} />
			</Routes>
		</Router>
	);
}

export default App;
