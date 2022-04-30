import { Box, Button, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { capitalize } from '../../utils/functions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.hint,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.paper,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminOperationCard = ({ op, handleProfile, handleDetails, handleStatus }) => {
  const { operation, user, caretaker, pet } = op
  const { id: operationId, price, timeLapse, status, createdAt } = op.operation
  const { name, lastname, mail, address, img } = op.user
  const { name: caretakerName, lastname: caretakerLastname, mail: caretakerMail, address: caretakerAddress, id: caretakerId } = op.caretaker
  const { name: petName } = op.pet

  return (
    <StyledTableRow key={operation.id}>
      <StyledTableCell component='th' scope='row'>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginLeft: '5px' }}>
            {capitalize(caretakerName)}{' '}
            {capitalize(caretakerLastname)}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell align='center'>
        {timeLapse}
      </StyledTableCell>
      <StyledTableCell align='center'>
        ${price}
      </StyledTableCell>
      <StyledTableCell align='right'>
        {new Date(createdAt).getDate()}/
        {new Date(createdAt).getMonth() + 1}/
        {new Date(createdAt).getFullYear()}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginLeft: '5px' }}>
            {capitalize(petName)}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell align='right'>
        <Typography>{status}</Typography>
      </StyledTableCell>
      <StyledTableCell align='right'>
        <Button
          onClick={() => handleProfile(caretakerId)}
        >
          See Profile
        </Button>
        <Button
          onClick={() => handleDetails(operationId, user)}
        >
          Operation Detail
        </Button>
        {status === 'APPROVED' ?
          <Button
            onClick={() => handleStatus(operationId)}
          >
            Complete Operation
          </Button> : null
        }
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default AdminOperationCard