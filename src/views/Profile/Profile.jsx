import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormProfile from '../../components/FormProfile/FormProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import ShieldIcon from '@mui/icons-material/Shield';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import UserProfile from '../../components/UserProfile/UserProfile';
import PetList from '../../components/PetList/PetList';
import FormPet from '../../components/FormPet/FormPet';
import { CuidadorForm } from '../Forms/CuidadorForm';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
        value: `${index}`,
    };
}

const Profile = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const { tab: defaultTab } = params;
    const [tab, setTab] = useState(defaultTab || '0');
    const [firstTab, setFirstTab] = useState(defaultTab);

    const handleChange = (event, newValue) => {
        setTab(newValue);
        setFirstTab(undefined);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1000 }}>
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
                        <Tab label='Be Caretaker' {...a11yProps(4)} />
                    </TabList>
                </Box>
                <TabPanel value='0' index={0} sx={{ margin: 'auto' }} children={<UserProfile />}></TabPanel>
                <TabPanel value='1' index={1}>
                    <FormProfile />
                </TabPanel>
                <TabPanel value='2' index={2}>
                    <PetList />
                </TabPanel>
                <TabPanel value='3' index={3}>
                    <FormPet />
                </TabPanel>
                {/* <TabPanel value='4' index={4} children={<CuidadorForm />}></TabPanel> */}
                <TabPanel value='4' index={4}>
                    Be caretaker
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default Profile;
