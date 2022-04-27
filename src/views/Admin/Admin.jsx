import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AdminUsers from '../../components/AdminUsers/AdminUsers';

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

const Admin = () => {
    const params = useParams();
    // const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const logged = useSelector((state) => state.userReducer.logged);
    const navigate = useNavigate();
    const { tab: defaultTab } = params;
    const [tab, setTab] = useState(defaultTab || '0');
    const [firstTab, setFirstTab] = useState(defaultTab);

    const handleChange = (event, newValue) => {
        setTab(newValue);
        setFirstTab(undefined);
    };

    const setInicial = (e, value) => {
        setTab(value);
    };

    useEffect(() => {
        if (!logged) {
            navigate('/');
        }
    }, [logged]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                // bgcolor: 'background.paper',
                display: 'flex',
                minHeight: '85vh',
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
                        sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}
                    >
                        <Tab label='Users' {...a11yProps(0)} />
                        {/* <Tab label='Edit Profile' {...a11yProps(1)} /> */}
                    </TabList>
                </Box>
                <TabPanel value='0' index={0} sx={{ width: '100%', heigth: '100%' }} children={<AdminUsers />} />
                {/* <TabPanel value='1' index={1} sx={{ margin: 'auto' }} children={<FormProfile />} /> */}
            </TabContext>
        </Box>
    );
};

export default Admin;
