import { Grid, Paper } from "@mui/material";
import React from "react";

export const LoginForm = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        Sign in
      </Paper>
    </Grid>
  );
};
