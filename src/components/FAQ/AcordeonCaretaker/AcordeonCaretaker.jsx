import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { dataAcordeonCaretaker } from '../dataFAQ';

export const AcordeonCaretaker = () => {
  return (
    <>
     { dataAcordeonCaretaker?.map((item, index) => {
        return (
            <Accordion key={index}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography color={'primary'}>
                    {item.description}
                </Typography>
                </AccordionDetails>
            </Accordion>

        )
    })
    }
    </>
  );
}