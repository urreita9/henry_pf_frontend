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
        const post = await axios.post("http://localhost:3001/api/users", data);
        if (post.data) {
          alert("User created");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
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
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          fullWidth
          required
          type="password"
          onChange={passwordChangeHandler}
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
        <Typography>
          <Link href="/login">Alredy have and account?</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default RegisterForm;
