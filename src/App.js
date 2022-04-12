import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Map from './components/Map/Map.jsx';

// dotenv.config();

function App() {
	return (
		<Map forUserForm={false} />
		// <Router>
		// 	<Switch>
		// 		{/* <Route exact path='/' component={Entry} /> */}
		// 		<Route>
		// 			{/* <Nav />
		// 	<Switch>
		// 		<Route exact path='/home' component={Home} />
		// 		<Route exact path='/pokemon/:id' component={Detail} />
		// 		<Route exact path='/create' component={Create} />
		// 		<Redirect to='/home' />
		// 	</Switch> */}
		// 		</Route>
		// 	</Switch>
		// </Router>
	);
}

export default App;
