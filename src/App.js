import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaretakerProfile from './views/CaretakerProfile/index';
import NavBar from './components/NavBar/NavBar';
import { Mapa } from './views/Map/Mapa';
import { Home } from './views/Home/Home';
import RegisterForm from './views/RegisterForm/RegisterForm';
import { LoginForm } from './views/LoginForm/LoginForm';
import { CuidadorForm } from './views/Forms/CuidadorForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import modeThemePalette from './assets/mui-theme-config/theme-mui';
import UserProfile from './views/UserProfile/UserProfile';

function App() {
	const [mode, setMode] = useState('light');

	useEffect(() => {}, [mode]);

	const theme = React.useMemo(
		() => createTheme(modeThemePalette(mode)),
		[mode]
	);

	function onToggleThemeMode(typeMode) {
		console.log(typeMode);
		typeMode ? setMode('dark') : setMode('light');
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Router>
					<NavBar onToggle={onToggleThemeMode} typeMode={mode} />
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/map' element={<Mapa />} />
						<Route exact path='/register' element={<RegisterForm />} />
						<Route exact path='/login' element={<LoginForm />} />
						<Route exact path='/caretaker/:id' element={<CaretakerProfile />} />
						<Route exact path='/host' element={<CuidadorForm />} />
						<Route exact path='/profile' element={<UserProfile />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</>
	);
}
export default App;
