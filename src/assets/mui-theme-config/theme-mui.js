const modeThemePalette = (mode) =>
	mode === 'light'
		? {
				palette: {
					type: 'light',
					primary: {
						main: '#F29278',
						contrastText: '#fafafa',
					},
					secondary: {
						main: '#D16891',
					},
					background: {
						default: '#fdfafa',
						paper: '#FAFAFA',
					},
					text: {
						primary: '#222222',
						hint: '#333333',
						disabled: '#000000',
						secondary: '#444444',
					},
					error: {
						main: '#ff200c',
					},
				},
		  }
		: {
				palette: {
					type: 'dark',
					primary: {
						main: '#e87575',
						contrastText: '#fafafa',
						dark: '#f3f3f3',
					},
					secondary: {
						main: '#E694B4',
						contrastText: 'rgba(255,255,255,0.87)',
					},
					background: {
						default: '#000000',
						paper: '#979797',
					},
					text: {
						primary: '#fff4f6',
						hint: '#333333',
						disabled: '#818080',
						secondary: '#ffd6cc',
					},
					error: {
						main: '#ff5436',
					},
					divider: 'rgba(175,175,175,0.97)',
				},
		  };

export default modeThemePalette;
