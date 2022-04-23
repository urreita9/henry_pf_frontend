import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SizeFilter } from './SizeFilter/SizeFilter';
import { PriceFilter } from './PriceFilter/PriceFilter';
import { RatingFilter } from './RatingFilter/RatingFilter';
import { filterByPetSize } from '../../redux/actions/actions';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { SizeDogs } from './Icons/SizeDogs';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StarsIcon from '@mui/icons-material/Stars';
import Paper from '@mui/material/Paper';
import { DescriptionFilter } from './DesciptionFilter/DescriptionFilter';

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
            <Typography component={'span'}>{children}</Typography>
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

export const ButtonMapFilter = ({handleCloseModal}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [form, setForm] = useState({
        size: '0',
		price: [0, 10000],
		rating: 2.5,
	});
	const [clickState, setClickState] = useState({
        size: false,
		price: false,
		rating: false,
	});

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

	const handleChangeFilter = (event) => {
		if (event.target.name === 'rating') {
			setForm({
				...form,
				[event.target.name]: Number(event.target.value),
			});
			return;
		}
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
		// setSelectedValue(event.target.value);
	};

	const handleFilterClick = () => {
		dispatch(filterByPetSize(form));
		navigate('/map');
	};

    return (
        <>
        <Box sx={{
            minHeight: '350px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <Tab icon={<LiveHelpIcon />} label="HOW TO DO"  {...a11yProps(0)}/>
                <Tab icon={<SizeDogs fill='currentColor' width='24px' height='24px' color='primary'/>} label="SIZE" {...a11yProps(1)} />
                <Tab icon={<PriceChangeIcon />} label="PRICE" {...a11yProps(2)} />
                {/* <Tab icon={<StarsIcon />} label="RATING" {...a11yProps(3)} /> */}
            </Tabs>
        <Box>
            <TabPanel value={value} index={0}>
                <DescriptionFilter />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SizeFilter handleChange={handleChangeFilter} form={form} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PriceFilter handleChange={handleChangeFilter} form={form} />
            </TabPanel>
            {/* <TabPanel value={value} index={3}>
                <RatingFilter handleChange={handleChangeFilter} form={form} />
            </TabPanel> */}
        </Box>
        <Button
            variant='contained'
			onClick={() => {handleFilterClick(); handleCloseModal()}}
			sx={{
				textAlign: 'center',
                borderRadius: '5px',
                
			}}
            >
            <Typography>
                Search caretakers
            </Typography>
			<SearchOutlinedIcon />
		</Button>
        </Box>
        </>
    );
};
