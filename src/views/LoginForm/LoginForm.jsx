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
// import { useNavigate } from "react-router-dom";
// import { login } from "./login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const changeHandler = (e) => {};

export const LoginForm = () => {
  const navigate = useNavigate();
  // const [check, setCheck] = useState(null); que no expire el token
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3001/api/auth/login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setpassword(event.target.value);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = {};
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
          onChange={userChangeHandler}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
          type="password"
          onChange={passwordChangeHandler}
        />
        <FormControlLabel
          control={
            <Checkbox
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
          onClick={handleSubmit}
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
