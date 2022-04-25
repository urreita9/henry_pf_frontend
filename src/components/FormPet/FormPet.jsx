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
  Card,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPet } from "../../redux/actions/actions";
import { checkFormPet } from "../../utils/functions";
import { styled } from "@mui/material/styles";
import swal from "sweetalert";
import UploadIcon from "@mui/icons-material/Upload";

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
  const pet = useSelector((state) => state.userReducer.pet);
  const [form, setForm] = useState(initForm);
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState(initErrors);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("uid");
  const [nameFile, setNameFile] = useState("");

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
      dispatch(createPet(token, id, form));
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
      setNameFile("");
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
    setNameFile("");
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
  }, [user]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setNameFile(file.name);
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
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '500px',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxSizing: "content-box",
      }}
      elevation={5}
    >

        <FormControl
          sx={{
              width: '100%',
            height: "60vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            padding: '1.2rem',
            boxSizing: "content-box",
          }}
        >

        <Box sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '2rem'
            }}>


            <img
              src={form.img || defaultImg}
              alt="Imagen Mascota"
              style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%'
              }}
            />
            <label htmlFor="PetFormImg" style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',

            }}>
            {nameFile && (
              <Typography variant="subtitle1" sx={{color: '#444', width: '150px',overflow: 'hidden', whiteSpace: 'nowrap'}} >
                {nameFile}
              </Typography>
            )}
              <Input
                accept="image/*"
                id="PetFormImg"
                type="file"
                name="img"
                onChange={handleFileInputChange}
              />
              <Button
                startIcon={<UploadIcon />}
                variant="contained"
                onChange={handleFileInputChange}
                name="img"
                component="span"
              >
                Upload
              </Button>


              {/* <Typography variant="caption" display="block" color="error">
                {!!errors.img && errors.img}
              </Typography> */}
            </label>

            </Box>

          <Box sx={{
              height: '50%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'center'
          }}>






  
        </Box>

          <Box sx={{
              height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}>

        <TextField
            id="name"
            error={!!errors.name}
            helperText={!!errors.name && errors.name}
            name="name"
            label="Pet name"
            value={form.name}
            onChange={handleChange}
            sx={{
                marginBottom: '0.7rem'
            }}
          />
          {/* <TextField id='img' name='img' label='Pet foto' value={form.img} onChange={handleChange} /> */}
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
          sx={{
              display: 'flex',
              justifyContent: 'center'
          }}
        />




        <Box
            sx={{
                width: "100%",
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




        </Box>





      <Typography variant="subtitle1" color="primary">
        {!!msg && msg}
      </Typography>
        </FormControl>
    </Card>
  );
};

export default FormPet;
