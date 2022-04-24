import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card, 
  Avatar,
  CardContent,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../redux/actions/actions";
import {
  capitalize,
  checkFormProfile,
  checkPassword,
} from "../../utils/functions";
import PassForm from "../PassForm/PassForm";
import UploadImg from "../UploadImg/UploadImg";
import swal from "sweetalert";
import { ImgButtonBases } from "../UploadImg/ImgButtonBases";

const initForm = {
  name: "",
  lastname: "",
  address: "",
};

const initErrors = {
  state: false,
  name: "",
  lastname: "",
  address: "",
};

const FormProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);
  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("uid");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      setEdit(!edit); //ACA SE EDITA
    } else {
      const check = checkFormProfile(form);
      setErrors((prevState) => {
        return { ...prevState, ...check };
      });

      if (!check.state) {
        setEdit(!edit); //ACA SE SUBMITEA
        dispatch(editUser(token, id, form));
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleCancel = (e) => {
    setForm({
      name: capitalize(user.name) || "",
      lastname: capitalize(user.lastname) || "",
      address: capitalize(user.address) || "",
      img: user.img || "",
    });
    setEdit(false);
  };

  useEffect(() => {
    setForm({
      name: capitalize(user.name) || "",
      lastname: capitalize(user.lastname) || "",
      address: capitalize(user.address) || "",
      img: user.img || "",
    });
  }, [user]);

  return (
    <Paper elevation={4} sx={{
      minWidth: '550px',
      width: '100%',
    }}>
      <Card sx={{
        height: '100%',
      }}>

      <Box
        sx={{
          height: '100%',
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: '15px'
        }}
      >
        <CardContent sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
      {/* <Avatar alt='UserImg' src={user?.img} sx={{ width: 200, height: 200 }} /> */}
          <UploadImg image={user?.img}/>
        </CardContent>
      
        <Box component={"form"} onSubmit={handleSubmit} sx={{width: '15rem'}}>
          <Box
            sx={{
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
            >
            <TextField
              id="Name"
              name="name"
              label="Name"
              disabled={!!user.name || !edit}
              error={!!errors.name}
              helperText={!!errors.name && errors.name}
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              id="Lastname"
              name="lastname"
              disabled={!!user.lastname || !edit}
              error={!!errors.lastname}
              helperText={!!errors.lastname && errors.lastname}
              label="Lastname"
              value={form.lastname}
              onChange={handleChange}
            />
            <TextField
              id="Address"
              disabled={!edit}
              name="address"
              error={!!errors.address}
              helperText={!!errors.address && errors.address}
              label="Address"
              value={form.address}
              onChange={handleChange}
            />
          </Box>

          {!edit ? (
            <Box>
              <Button variant="contained" type="submit">
                Edit Profile
              </Button>
            </Box>
          ) : (
            <Box
            sx={{
                width: "15vw",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      <PassForm />
      </Box>
    </Card>
    </Paper>
  );
};

export default FormProfile;

// <label htmlFor='file'>Choose 3 pictures that describes your home</label>
// <input type='file' name='image' onChange={handleFileInputChange}/>
