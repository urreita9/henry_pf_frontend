import { Box, Card, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { captureOperation } from '../../redux/actions/operationActions';
import { useParams, useSearchParams } from 'react-router-dom';

export const Operation = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);

  const { operation, createdOperation } = useSelector(
    (state) => state.operationsReducer
  );
  console.log(operation);
  console.log(createdOperation);
  const { id, status } = operation;
  // const { email_address, name: given_name, name: surname } = operation.payer;
  useEffect(() => {
    dispatch(captureOperation(token));
  }, [dispatch]);

  return (
    <Grid item xs={12}>
      <Card>
        <Box>Operation # {id}</Box>
        {/* <Box>user # {userId}</Box> */}
        {/* <Box>caretaker # {caretakerId}</Box> */}
        {/* <Box>User Name </Box>
        <Box>Caretaker Name </Box> */}
        {/* <Box>Price {price}</Box> */}
        {/* <Box>Nights: {timeLapse}</Box> */}
        {/* <Box>Total {totalCheckout}</Box> */}
        {/* <Box>
				Date Range {datesRange[0].startDate} - {datesRange[0].endDate}
			</Box> */}
        {/* <Box>Status: {status}</Box> */}
      </Card>
    </Grid>
  );
};
