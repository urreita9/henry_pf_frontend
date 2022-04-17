import { useState } from "react";
import {
  Box,
  Button,
  Radio,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Mapa } from "../Map/Mapa";
import { useDispatch } from "react-redux";
import { postCaretaker } from "../../redux/actions/actions";
import TestCloudinary from "../../components/TestCloudinary/index";

const initialForm = {
  lat: null,
  lng: null,
  price: 10,
  size: "1",
  description: "Hi Im John and I live in...",
  homeDescription: "My house has a garden...",
  rating: 4,
  images: [],
  //image:
  // 'https://karlaperezyt.com/wp-content/uploads/kui_system/telegram_profiles/2980022.jpg',
};
const initialErrors = {
  lat: null,
  price: null,
  size: null,
  description: null,
  homeDescription: null,
};

export const CuidadorForm = () => {
  const MAX_LENGTH = 3;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isTouched, setIsTouched] = useState(false);
  const userId = "39288c4f-757a-4f9d-8ae6-5de8cbdefcfc";
  const dispatch = useDispatch();
  const [fileInputState, setFileInputState] = useState("");
  // const [previewSource, setPreviewSource] = useState('');

  const handleInputChange = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: null,
    });
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const controlProps = (item) => ({
    checked: form.size === item,
    onChange: handleInputChange,
    value: item,
    name: "size",
    inputprops: { "aria-label": item },
  });
  const onSave = () => {
    if (form.description.length < 70) {
      console.log("description < 70");
      setErrors({
        ...errors,
        description: "Description must be at least 70 characters long",
      });
    } else if (!form.description.trim(" ").length) {
      setErrors({ ...errors, description: "Description cant be empty" });
    } else if (Number(form.price) < 1) {
      console.log("price < 1");
      setErrors({
        ...errors,
        price: "Price must be greater than 0",
      });
    } else if (form.lat === null) {
      setErrors({
        ...errors,
        lat: "Must out marker in Map showing your aproximate location",
      });
    } else if (!form.homeDescription.trim(" ").length) {
      setErrors({
        ...errors,
        homeDescription: "Home description cant be empty",
      });
    } else if (form.homeDescription.length < 70) {
      setErrors({
        ...errors,
        homeDescription: "Home description must be at least 70 characters long",
      });
    } else {
      if (form.images.length !== MAX_LENGTH) return;
      dispatch(postCaretaker({ ...form, userId }));
    }
  };

  const handleFileInputChange = (e) => {
    //const file = e.target.files[0];
    const files = Array.from(e.target.files);
    previewFile(files);
  };

  const previewFile = async (files) => {
    //reader.readAsDataURL(file);
    const filesURL = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
    setForm({
      ...form,
      images: await Promise.all(filesURL),
    });
  };

  return (
    <>
      <Box sx={{ marginBottom: 2, paddingX: 2 }}>
        <Typography variant="h4">
          Fill in this form and start recievieng pets!
        </Typography>
        <TextField
          fullWidth
          rows={4}
          sx={{ marginTop: 2, marginBottom: 1 }}
          placeholder="Hi! Im John. I am 25 years old and..."
          autoFocus
          multiline
          label="The users want to know you before they decide..."
          // helperText={errors.description && errors.description}
          error={errors.description && isTouched}
          value={form.description}
          onChange={handleInputChange}
          onBlur={() => setIsTouched(true)}
          name="description"
        />
        {errors.description && (
          <Box color="red" textAlign="center">
            {errors.description}
          </Box>
        )}

        <div>
          <label htmlFor="file">
            Choose 3 pictures that describes your home
          </label>
          <br />
          <input
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            multiple
          />
          {/* <button type='submit'>Upload</button> */}
          {/* </form> */}
          {form.images?.length &&
            form.images.map((image) => (
              <img src={image} alt="img" style={{ height: "300px" }} />
            ))}
        </div>
        <div>
          <Typography>Pet size you are able to take care of</Typography>
          <Radio
            {...controlProps("0")}
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 20,
                color: "#F29279",
              },
            }}
            label="Small"
          />
          <Radio
            {...controlProps("1")}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 24,
                color: "#F29279",
              },
            }}
            label="Medium"
          />
          <Radio
            {...controlProps("2")}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 30,
                color: "#F29279",
              },
            }}
            label="Big"
          />
        </div>
        <Typography>$ Price per night </Typography>
        <Input
          value={form.price}
          type="number"
          onChange={handleInputChange}
          name="price"
          placeholder="$10"
          error={errors.price && errors.price}
        />
        {errors.price && (
          <Box color="red" extAlign="center">
            {errors.price}
          </Box>
        )}

        <Typography>Put your Marker on the Map</Typography>
        {errors.lat && (
          <Box color="red" textAlign="center">
            {errors.lat}
          </Box>
        )}
        <Box
          sx={{
            position: "relative",
            maxWidth: "100%",
            height: "500px",
          }}
        >
          <Mapa
            formUse={true}
            setFormCoords={setForm}
            form={form}
            setErrors={setErrors}
            errors={errors}
          />
        </Box>

        <TextField
          fullWidth
          rows={4}
          sx={{ marginTop: 2, marginBottom: 1 }}
          placeholder="Nice neighborhood, with a small garden..."
          autoFocus
          multiline
          label="Tell us about your home..."
          // helperText={errors.homeDescription && errors.homeDescription}
          error={errors.homeDescription && isTouched}
          value={form.homeDescription}
          onChange={handleInputChange}
          onBlur={() => setIsTouched(true)}
          name="homeDescription"
        />
        {errors.homeDescription && (
          <Box color="red" textAlign="center">
            {errors.homeDescription}
          </Box>
        )}
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="text"
            onClick={() => {
              setForm(initialForm);
              setIsTouched(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F29279",
              color: "white",
              borderColor: "#F29279",
            }}
            endIcon={<SaveOutlinedIcon />}
            onClick={onSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};
