import {
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../axios";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const userChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setpassword(event.target.value);
  };

  const submitHandler = async (event) => {
    if (email === "") {
      event.preventDefault();
      alert("Complete form correctly");
    } else {
      try {
        let data = { email: email, password: password };
        const post = await api.post("/users", data);
        console.log(post);
        if (post.data) {
          alert("User created");
          navigate("/login");
        }
      } catch (error) {
        console.log(error.response);
        alert("Email alredy registered!");
      }
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = {
    // backgroundColor: "#ffffff", //!  <--- August aca va el color del icono
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PetsIcon />
          </Avatar>
          <h2>Sign up!</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter email.."
          fullWidth
          required
          onChange={userChangeHandler}
          sx={{ marginTop: "30px" }}
        />

        <TextField
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
          type="password"
          onChange={passwordChangeHandler}
          sx={{ marginTop: "30px" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ margin: "8px 0" }}
          onClick={submitHandler}
        >
          Register
        </Button>
        <Button>Already have an account?</Button>
      </Paper>
    </Grid>
  );
};

export default RegisterForm;
