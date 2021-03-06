import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ImageBackgroundLanding } from "./ImageBackgroundLanding/ImageBackgroundLanding";
import { PatitasBackground } from "./PatitasBackground/PatitasBackground";
import { ImagePersonWithPet } from "./ImagePersonWithPet/ImagePersonWithPet";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <ImageBackgroundLanding width={"100%"} height={"100%"} />
      <PatitasBackground width={"100%"} height={"100%"} />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "100",
          top: "0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            sx={{
              color: "#FAFAFA",
              padding: "0 1.2rem",
              marginBottom: "2rem",
              fontWeight: "bold",
            }}
          >
            Find the ideal sitter for your pet
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{
              color: "#FAFAFA",
              padding: "0 1.2rem",
              marginBottom: "2rem",
              fontWeight: "light",
            }}
          >
            Our pets are part of the family and that is why we want the best for
            them. We created a platform to offer you a service where you can
            find the ideal caregiver based on your needs with detailed
            information about their qualification, distance and price.
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: "2.2rem",
              background:
                "linear-gradient(90.06deg, #FFE8CB 0.9%, #F9D29D 96.96%)",
              color: "#F37856",
            }}
            size="large"
            onClick={() => navigate(`/`)}
          >
            Hire a caretaker
          </Button>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImagePersonWithPet width={"100%"} height={"100%"} />
        </Box>
      </Box>
    </>
  );
};
