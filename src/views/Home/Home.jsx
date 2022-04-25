import { Box, Button, Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCaretakers } from "../../redux/actions/actions";
import { ButtonMapFilter } from "../../components/MapFilters/ButtonFilter";
// import StepperModal from "../Stepper/Stepper";
import { FAQ } from "../../components/FAQ/FAQ";
import petsHome from "../../utils/petshome.jpg";
import personamascota from "../../utils/personaconmascota.jpg";
import mascota2 from "../../utils/mascotas2.jpg";
import * as Carousel from "../../components/Carousel";
import axios from "axios";
// import { style } from "@mui/system";

const clickHandler = async () => {
  const response = await axios.post(
    "http://localhost:3001/api/operations/create-order"
  );
  console.log(response);
  window.location.href = response.data.links[1].href; //! importante
};
export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaretakers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "80vh",
          marginTop: "2rem",
          backgroundColor: "background",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            left: "4rem",
            zIndex: "300",
            width: "40%",
            maxWidth: "500px",
            height: "70vh",
            maxHeight: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            padding: "1.5rem",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Find sitters for your pets
          </Typography>

          <ButtonMapFilter />
        </Paper>
        <Paper
          elevation={2}
          sx={{
            // backgroundImage: `url(${petsHome})`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            // minHeight: '500px',
            // height: '100%',
            borderRadius: "10px",
          }}
        >
          <Carousel.Component options={{ autoplay: 2000 }}>
            <Carousel.Slide>
              <img
                src={petsHome}
                width="100%"
                height="500px"
                alt=""
                borderRadius="10px"
                style={{ borderRadius: "10px" }}
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <img
                src={personamascota}
                width="100%"
                height="500px"
                alt=""
                style={{ borderRadius: "10px" }}
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <img
                src={mascota2}
                width="100%"
                height="500px"
                alt=""
                style={{ borderRadius: "10px" }}
              />
            </Carousel.Slide>
          </Carousel.Component>
          {/* <StepperModal /> */}
          {/* <Typography variant="h2" sx={{ textAlign: "center" }}>
              Find the best place for your pet!
            </Typography> */}

          {/* <img src={petsHome} alt="" height={'100%'}  style={{borderRadius: '5px'}}/> */}
        </Paper>
      </Container>
      <Container>
        <FAQ />
      </Container>
      <Button onClick={clickHandler}> Checkout test</Button>
    </>
  );
};
