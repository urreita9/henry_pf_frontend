import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { Paper } from '@mui/material';

export const DescriptionFilter = () => {
  return (
    <Paper elevation={2}>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        aria-label="contacts"
        disablePadding
        >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText inset primary="Steps:" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText inset primary="1. Select size pets" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText inset primary="2. Select range price per night" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText inset primary="4. Press the button 'Search Caretaker'" />
          </ListItemButton>
        </ListItem>
      </List>
      </Paper>
  );
}