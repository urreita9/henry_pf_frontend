import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/actions/actions";
import {
  capitalize,
  checkFormPass,
  checkPassword,
} from "../../utils/functions";

const initPassForm = {
  actual: "",
  new: "",
  repeat: "",
};

const initErrors = {
  state: false,
  actual: "",
  new: "",
  repeat: "",
};

const initViews = {
  actual: false,
  new: false,
  repeat: false,
};

const PassForm = () => {
  const dispatch = useDispatch();
  const [passForm, setPassForm] = useState(initPassForm);
  const [errors, setErrors] = useState(initErrors);
  const [viewPass, setViewPass] = useState(initViews);
  const [editPassword, setEditPassword] = useState(false);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("uid");

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!editPassword) {
      setEditPassword(!editPassword); //ACA SE EDITA
    } else {
      // setEditPassword(!editPassword); //ACA SE SUBMITEA
      const check = checkFormPass(passForm);
      setErrors((prevState) => {
        return { ...prevState, ...check };
      });

      if (!check.state) {
        const resp = await checkPassword(token, id, passForm.actual);
        if (resp) {
          dispatch(editUser(token, id, { password: passForm.new }));
          setEditPassword(!editPassword);
          setPassForm(initPassForm);
          setViewPass(initViews);
        } else {
          setErrors({
            ...errors,
            actual: "Contraseña erronea",
          });
        }
      }
    }
  };

  const handleChangePassword = (e) => {
    setPassForm({
      ...passForm,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleChangeView = (name = "") => {
    return (e) => {
      setViewPass({
        ...viewPass,
        [name]: !viewPass[name],
      });
    };
  };

  const handleCancelPassword = (e) => {
    setPassForm(initPassForm);
    setViewPass(initViews);
    setEditPassword(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Box component={"form"} onSubmit={handleSubmitPassword}>
        {!editPassword ? (
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmitPassword}
            >
              Edit Password
            </Button>
          </Box>
        ) : (
          <Box>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="actual">Actual Password</InputLabel>
              <FilledInput
                id="actual"
                name="actual"
                type={viewPass.actual ? "text" : "password"}
                value={passForm.actual}
                onChange={handleChangePassword}
                error={!!errors.actual}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleChangeView("actual")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {viewPass.actual ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>
                {!!errors.actual && errors.actual}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="new">New Password</InputLabel>
              <FilledInput
                id="new"
                name="new"
                type={viewPass.new ? "text" : "password"}
                value={passForm.new}
                error={!!errors.new}
                onChange={handleChangePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleChangeView("new")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {viewPass.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
              <FormHelperText error>
                {!!errors.new && errors.new}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="repeat">Repeat Password</InputLabel>
              <FilledInput
                id="repeat"
                name="repeat"
                type={viewPass.repeat ? "text" : "password"}
                value={passForm.repeat}
                error={!!errors.repeat}
                onChange={handleChangePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleChangeView("repeat")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {viewPass.repeat ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Repeat Password"
              />
              <FormHelperText error>
                {!!errors.repeat && errors.repeat}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              color="error"
              onClick={handleSubmitPassword}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelPassword}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PassForm;
