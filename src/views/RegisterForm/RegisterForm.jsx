import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import api from "../../axios";
import { checkRegForm } from "./functions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoginForm } from "../LoginForm/LoginForm";
import { Box } from "@mui/system";
import swal from "sweetalert";
import Swal from "sweetalert2";

const initRegForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  repeat: "",
};

const initErrors = {
  state: false,
  name: "",
  lastname: "",
  email: "",
  password: "",
  repeat: "",
};

const RegisterForm = () => {
  const [regForm, setRegForm] = useState(initRegForm);
  const [errors, setErrors] = useState(initErrors);
  const [viewPass, setViewPass] = useState({ password: false, repeat: false });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeHandler = (event) => {
    setRegForm({
      ...regForm,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: "",
    });
  };

  const userCreated = () => {
    return swal({
      title: "User created!",
      text: "You can now log in",
      icon: "success",
      button: "OK!",
    }).then(handleOpen());
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const check = checkRegForm(regForm);
    setErrors((prevState) => {
      return { ...prevState, ...check };
    });
    if (!check.state) {
      try {
        const post = await api.post("/users", { ...regForm });
        if (post.data.state) {
          //?ABRE EL MODAL DE USUARIO REGISTRADO EXITOSAMENTE
          userCreated();
        }
      } catch (error) {
        setErrors({
          ...errors,
          email: error.response.data.msg,
        });
      }
    }
  };
  const handleChangeView = (name = "") => {
    return (e) => {
      setViewPass({
        ...viewPass,
        [name]: !viewPass[name],
      });
    };
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={style}>
            <LoginForm />
          </Box>
        </Modal>
        <TextField
          label="Name*"
          name="name"
          placeholder="Enter your name"
          fullWidth
          onChange={changeHandler}
          autoFocus
          error={!!errors.name}
          helperText={errors.name}
          sx={{ marginTop: "30px" }}
        />

        <TextField
          label="Lastname*"
          name="lastname"
          placeholder="Enter your lastname"
          fullWidth
          error={!!errors.lastname}
          helperText={errors.lastname}
          onChange={changeHandler}
          sx={{ marginTop: "30px" }}
        />
        <TextField
          name="email"
          label="Email*"
          placeholder="Enter email.."
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          onChange={changeHandler}
          sx={{ marginTop: "30px" }}
        />
        <FormControl fullWidth sx={{ marginTop: "30px" }}>
          <InputLabel htmlFor="password">Password*</InputLabel>
          <OutlinedInput
            label="password*"
            id="password"
            name="password"
            type={viewPass.password ? "text" : "password"}
            value={regForm.password}
            onChange={changeHandler}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleChangeView("password")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {viewPass.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error>
            {!!errors.password && errors.password}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "30px" }}>
          <InputLabel htmlFor="repeat">Repeat Password*</InputLabel>
          <OutlinedInput
            label="repeat*"
            id="repeat"
            name="repeat"
            type={viewPass.repeat ? "text" : "password"}
            value={regForm.repeat}
            onChange={changeHandler}
            error={!!errors.repeat}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle repeat visibility"
                  onClick={handleChangeView("repeat")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {viewPass.repeat ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error>
            {!!errors.repeat && errors.repeat}
          </FormHelperText>
        </FormControl>

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
        <Button onClick={handleOpen}>Already have an account?</Button>
      </Paper>
    </Grid>
  );
};

export default RegisterForm;
