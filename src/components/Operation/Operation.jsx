import { Box, Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { captureOperation } from "../../redux/actions/operationActions";

export const Operation = () => {
  const dispatch = useDispatch();
  const { operation } = useSelector((state) => state.operationsReducer);
  console.log(operation);
  // const { id, userId, caretakerId, status, totalCheckout, price, timeLapse } =
  //   operation;
  // useEffect(() => {
  //   // dispatch(captureOperation());
  // }, [dispatch]);

  const [data, setData] = useState("");

  useEffect(() => {});

  return (
    <Grid item xs={12}>
      <Card>
        {/* <Box>Operation # {id}</Box> */}
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
