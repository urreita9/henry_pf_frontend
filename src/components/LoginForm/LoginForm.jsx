import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";

const changeHandler = (e) => {};

export const LoginForm = () => {
  const [check, setCheck] = useState(null);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = {
    // backgroundColor: "#f50057", //!  <--- August aca va el color del icono
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PetsIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username.."
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
          type="password"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={check}
              onChange={changeHandler}
              name="checkedB"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ margin: "8px 0" }}
        >
          Sign in
        </Button>
        <Typography>
          <Link href="register">Don't have an account?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
