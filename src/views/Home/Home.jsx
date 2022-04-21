import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCaretakers } from "../../redux/actions/actions";
import { GroupSizesColors } from "../../components/ButtonGroup/ButtonGroup";
import StepperModal from "../Stepper/Stepper";
import { FAQ } from "../../components/FAQ/FAQ";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCaretakers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <GroupSizesColors />
        </Box>
        <Typography variant="h2" component="h1" sx={{ textAlign: "center" }}>
          ✈️Are you traveling?🌎
        </Typography>
        <StepperModal />
        <Box
          sx={{
            backgroundImage: `url(https://media.discordapp.net/attachments/943293732390850604/964687920890007632/Pngtreecontinuous_line_drawing_of_dog_5332973.png?width=716&height=335)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "90%",
            height: "500px",
            margin: "10px auto",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          {/* <Typography
					variant='h2'
					component='h3'
					width='500px'
					color='success'
					sx={{ margin: '0 auto', fontWeight: '600' }}
				>
					Find the perfect home for your pets while you are away
				</Typography> */}
        </Box>

        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Find the best place for your pet!
        </Typography>
        <FAQ />
      </Container>
    </>
  );
};
