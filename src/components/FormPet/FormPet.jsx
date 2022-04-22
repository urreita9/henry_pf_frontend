import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPet,
  createPet,
  editUser,
  getUser,
} from "../../redux/actions/actions";
import { checkFormPet } from "../../utils/functions";
import { styled } from "@mui/material/styles";
import swal from "sweetalert";
// import { capitalize } from '../../utils/functions';

const initForm = {
  name: "",
  age: 0,
  race: "dog",
  size: "small",
  specialFood: false,
  img: "",
  userId: "",
};

const initErrors = {
  state: false,
  name: "",
  age: "",
  img: "",
};

const Input = styled("input")({
  display: "none",
});

const defaultImg =
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/65761296352685.5eac4787a4720.jpg";

const FormPet = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [form, setForm] = useState(initForm);
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState(initErrors);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("uid");

  const successAlert = () => {
    return swal({
      title: "Success!",
      text: "Mascota creada exitosamente",
      icon: "success",
      button: false,
      timer: 2000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = checkFormPet(form);
    setErrors((prevState) => {
      return { ...prevState, ...check };
    });

    if (!check.state) {
      dispatch(createPet(token, form));
      setForm({
        ...form,
        name: "",
        age: 0,
        race: "dog",
        size: "small",
        specialFood: false,
        img: "",
      });
      document.getElementById("PetFormImg").value = "";
      setMsg("Mascota creada exitosamente");
      successAlert();
    }
  };

  const handleReset = (e) => {
    setForm({
      ...form,
      name: "",
      age: 0,
      race: "dog",
      size: "small",
      specialFood: false,
      img: "",
    });
    document.getElementById("PetFormImg").value = "";
    setErrors(initErrors);
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
    setMsg("");
  };

  const handleSwitch = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
    setMsg("");
  };

  useEffect(() => {
    setForm({
      ...form,
      userId: id,
    });

    return () => {
      dispatch(clearPet());
    };
  }, [user]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setForm({
        ...form,
        img: reader.result,
      });
    };
    setErrors({
      ...errors,
      img: "",
    });
    setMsg("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <img src={form.img || defaultImg} alt="Imagen Mascota" width={"100px"} />
      <Box>
        <FormControl
          sx={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <TextField
            id="name"
            error={!!errors.name}
            helperText={!!errors.name && errors.name}
            name="name"
            label="Pet name"
            value={form.name}
            onChange={handleChange}
          />

          {/* <TextField id='img' name='img' label='Pet foto' value={form.img} onChange={handleChange} /> */}

          <label htmlFor="PetFormImg">
            <Input
              accept="image/*"
              id="PetFormImg"
              type="file"
              name="img"
              onChange={handleFileInputChange}
            />
            <Button
              variant="contained"
              onChange={handleFileInputChange}
              name="img"
              component="span"
            >
              Upload
            </Button>
            <Typography variant="caption" display="block" color="error">
              {!!errors.img && errors.img}
            </Typography>
          </label>

          <TextField
            id="age"
            name="age"
            error={!!errors.age}
            helperText={!!errors.age && errors.age}
            label="Pet age"
            InputProps={{ inputProps: { min: 0, max: 25 } }}
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            value={form.age}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel>Type of Pet</FormLabel>
            <RadioGroup
              row
              name="race"
              value={form.race}
              onChange={handleChange}
            >
              <FormControlLabel value="dog" control={<Radio />} label="Dog" />
              <FormControlLabel value="cat" control={<Radio />} label="Cat" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Size</FormLabel>
            <RadioGroup
              row
              name="size"
              value={form.size}
              onChange={handleChange}
            >
              <FormControlLabel
                value="small"
                control={<Radio />}
                label="Small"
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="big" control={<Radio />} label="Big" />
            </RadioGroup>
          </FormControl>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={form.specialFood}
              onChange={handleSwitch}
              name="specialFood"
            />
          }
          label="Special Food"
          labelPlacement="start"
        />
      </Box>
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
          Create
        </Button>
        <Button variant="contained" color="error" onClick={handleReset}>
          Reset
        </Button>
      </Box>
      <Typography variant="subtitle1" color="primary">
        {!!msg && msg}
      </Typography>
    </Box>
  );
};

export default FormPet;
