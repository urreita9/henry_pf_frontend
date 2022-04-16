import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaretakerProfile from './components/CaretakerProfile';
import NavBar from './components/NavBar/NavBar';
import { Mapa } from './components/Map/Mapa';
import { Home } from './components/Home/Home';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { LoginForm } from './components/LoginForm/LoginForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import modeThemePalette from './assets/mui-theme-config/theme-mui';

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
        <NavBar onToggle={onToggleThemeMode} typeMode={mode} />
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/map' element={<Mapa />} />
            <Route exact path='/register' element={<RegisterForm />} />
            <Route exact path='/login' element={<LoginForm />} />
            <Route exact path='/caretaker/:id' element={<CaretakerProfile />} />
            {/* <Route exact path='/caretaker/:id' element={<Detail />} /> */}
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
