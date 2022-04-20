import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TabContainerFAQ } from './TabContainerFAQ/TabContainerFAQ';
import Typography from '@mui/material/Typography';

export const FAQ = () => {
  return (
    <>
        <Typography variant="h4" gutterBottom component="div"  sx={{marginTop: '5rem'}}>
            How can we help you?
        </Typography>
        <Paper elevation={3}>
            <Box>
                <TabContainerFAQ />
            </Box>
        </Paper>
    </>
  )
}