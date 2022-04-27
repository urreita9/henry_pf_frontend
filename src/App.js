import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CaretakerProfile from './views/CaretakerProfile/index';
import NavBar from './components/NavBar/NavBar';
import { NewMap } from './views/NewMap/NewMap';
import { Home } from './views/Home/Home';
import { Landing } from './views/Landing/Landing.jsx';
import { CuidadorForm } from './views/Forms/CuidadorForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import modeThemePalette from './assets/mui-theme-config/theme-mui';
import { setThemeMode } from './redux/actions/actions';
import { Operation } from './components/Operation/Operation';
import { Operations } from './components/Operations/Operations';
import Profile from './views/Profile/Profile';

function App() {
	const bodyPettrip = document.getElementById('bodyPettrip');
	const { mode } = useSelector((state) => state.themeModeReducer);
	const dispatch = useDispatch();

	useEffect(() => {}, [mode]);

	const theme = React.useMemo(
		() => createTheme(modeThemePalette(mode)),
		[mode]
	);

	function onToggleThemeMode(typeMode) {
		typeMode ? dispatch(setThemeMode('dark')) : dispatch(setThemeMode('light'));
		if (typeMode) {
			bodyPettrip.classList.remove('bodyLight');
			bodyPettrip.classList.add('bodyDark');
		} else {
			bodyPettrip.classList.remove('bodyDark');
			bodyPettrip.classList.add('bodyLight');
		}
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Router>
					<NavBar onToggle={onToggleThemeMode} typeMode={mode} />
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/welcome' element={<Landing />} />
						<Route exact path='/map' element={<NewMap />} />
						<Route exact path='/caretaker/:id' element={<CaretakerProfile />} />
						<Route exact path='/host' element={<CuidadorForm />} />
						<Route exact path='/profile' element={<Profile />} />
						<Route exact path='/profile/:tab' element={<Profile />} />
						<Route exact path='/history' element={<Operations />} />
						<Route exact path='/newOperation' element={<Operation />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</>
	);
}
export default App;
