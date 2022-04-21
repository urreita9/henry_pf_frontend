import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";s
import api from "../../axios";
const RegisterForm = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const lastnameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

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
        let data = {
          name: name,
          lastname: lastname,
          email: email,
          password: password,
        };
        const post = await api.post("/users", data);
        console.log(post);
        if (post.data) {
          alert("User created successfully");
        }
      } catch (error) {
        console.log(error.response);
        alert("That email has alrede been registered!");
      }
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar>
            <PetsIcon />
          </Avatar>
          <h2>Sign up!</h2>
        </Grid>
        <TextField
          label="Name"
          placeholder="Enter your name"
          fullWidth
          required
          onChange={nameChangeHandler}
          sx={{ marginTop: "30px" }}
        />
        <TextField
          label="Lastname"
          placeholder="Enter your lastname"
          fullWidth
          required
          onChange={lastnameChangeHandler}
          sx={{ marginTop: "30px" }}
        />
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
