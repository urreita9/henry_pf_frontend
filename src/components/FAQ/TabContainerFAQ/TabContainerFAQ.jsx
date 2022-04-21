import React from 'react';
import { AcordeonUser } from '../AcordeonUser/AcordeonUser';
import { AcordeonPayment } from '../AcordeonPayment/AcordeonPayment';
import { AcordeonCaretaker } from '../AcordeonCaretaker/AcordeonCaretaker'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AcordeonPettrip } from '../AcordeonPettrip/AcordeonPettrip';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const TabContainerFAQ = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="PetTripp" {...a11yProps(0)} />
          <Tab label="User" {...a11yProps(1)} />
          <Tab label="Caretaker" {...a11yProps(2)} />
          <Tab label="Payment" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AcordeonPettrip />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AcordeonUser />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AcordeonCaretaker />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AcordeonPayment />
      </TabPanel>
    </Box>
  );
}