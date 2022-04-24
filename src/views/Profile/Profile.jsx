import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormProfile from '../../components/FormProfile/FormProfile';
import UserProfile from '../../components/UserProfile/UserProfile';
import PetList from '../../components/PetList/PetList';
import FormPet from '../../components/FormPet/FormPet';
import { CuidadorForm } from '../Forms/CuidadorForm';
import CaretakerDescription from '../../components/CaretakerDescription';
import { CaretakerUserProfile } from '../../components/CaretakerUserProfile/CaretakerUserProfile';

const defaultProps = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'flex-start',

	width: '100%',
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
		value: `${index}`,
	};
}

const Profile = () => {
	const params = useParams();
	// const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const { tab: defaultTab } = params;
	const [tab, setTab] = useState(defaultTab || '0');
	const [firstTab, setFirstTab] = useState(defaultTab);

	const isUserACaretaker = useRef(false);

	const handleChange = (event, newValue) => {
		setTab(newValue);
		setFirstTab(undefined);
	};

	const setInicial = (e, value) => {
		setTab(value);
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: 'background.paper',
				display: 'flex',
				height: 500,
			}}
		>
			<TabContext value={firstTab || tab}>
				<Box>
					<TabList
						orientation='vertical'
						variant='scrollable'
						value={tab}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						sx={{ borderRight: 1, borderColor: 'divider' }}
					>
						<Tab label='Profile' {...a11yProps(0)} />
						<Tab label='Edit Profile' {...a11yProps(1)} />
						<Tab label='Pet List' {...a11yProps(2)} />
						<Tab label='Add Pet' {...a11yProps(3)} />
						{!user.caretaker ? (
							<Tab label='Be Caretaker' {...a11yProps(4)} />
						) : (
							<Tab label='Edit Caretaker Profile' {...a11yProps(4)}></Tab>
						)}
						{isUserACaretaker.current && (
							<Tab label='Caretaker Profile' {...a11yProps(5)} />
						)}
					</TabList>
				</Box>
				<TabPanel
					value='0'
					index={0}
					sx={{ margin: 'auto' }}
					children={<UserProfile />}
				/>
				<TabPanel
					value='1'
					index={1}
					sx={{ margin: 'auto' }}
					children={<FormProfile />}
				/>
				<TabPanel
					value='2'
					index={2}
					children={<PetList onClick={setInicial} />}
				/>
				<TabPanel
					value='3'
					index={3}
					sx={{ margin: 'auto' }}
					children={<FormPet />}
				/>
				<TabPanel value='4' index={4} children={<CuidadorForm />} />
				<TabPanel value='5' index={5} children={<CaretakerUserProfile />} />
				{/* <TabPanel value='4' index={4}>
                    Be caretaker
                </TabPanel> */}
			</TabContext>
		</Box>
	);
};

export default Profile;
