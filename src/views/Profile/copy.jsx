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

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userReducer.user);
    const [tab, setTab] = useState('1');

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Box sx={{ width: '50%', margin: 'auto', marginTop: '5%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label='lab API tabs example'
                            orientation='vertical'
                            variant='scrollable'
                        >
                            <Tab icon={<AccountCircleIcon />} iconPosition='bottom' label='Profile' value='1' />
                            <Tab icon={<PetsIcon />} iconPosition='bottom' label='Pets' value='2' />
                            <Tab icon={<ShieldIcon />} iconPosition='bottom' label='Caretaker' value='3' />
                        </TabList>
                    </Box>
                    <TabPanel value='1'>
                        <FormProfile />
                    </TabPanel>
                    <TabPanel value='2'>Item Two</TabPanel>
                    <TabPanel value='3'>Item Three</TabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default UserProfile;
