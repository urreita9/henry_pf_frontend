import { useState } from "react";
import { intervalToDuration, differenceInCalendarDays } from "date-fns";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../axios";
import LoginModal from "../LoginModal/LoginModal";

const TicketCard = ({ price, datesRange }) => {
  const timeLapse = intervalToDuration({
    start: new Date(datesRange[0].startDate),
    end: new Date(datesRange[0].endDate),
  }).days;

  const time = differenceInCalendarDays(
    new Date(datesRange[0].endDate),
    new Date(datesRange[0].startDate)
  );

  const [openLogin, setOpenLogin] = useState(false);
  const { logged, user } = useSelector((state) => state.userReducer);
  const { caretakerProfile } = useSelector((state) => state.cuidadoresReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginModal = () => {
    setOpenLogin(!openLogin);
  };

  const sum = price * time;
  const totalCheckout = sum + sum * 0.03;

  const handleOperationSubmit = async (
    buyerId,
    sellerId,
    price,
    datesRange,
    timeLapse,
    totalCheckout
  ) => {
    const response = await api.post(
      "http://localhost:3001/api/operations/create-order",
      {
        buyerId,
        sellerId,
        price,
        datesRange,
        timeLapse,
        totalCheckout,
      }
    );

    window.location.href = response.data.links[1].href;
  };
  return (
    <>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textAlign: "end" }}
          color="text.secondary"
          gutterBottom
        >
          ${price} per night
        </Typography>
        <Typography variant="h5" component="div">
          Checkout
        </Typography>
        {time !== 0 && datesRange[0].endDate && (
          <>
            <Typography sx={{ mb: 1, textAlign: "end" }} color="text.secondary">
              {datesRange[0].startDate.getDate()}/
              {datesRange[0].startDate.getMonth()}/
              {datesRange[0].startDate.getFullYear()} -
              {datesRange[0].endDate.getDate()}/
              {datesRange[0].endDate.getMonth()}/
              {datesRange[0].endDate.getFullYear()}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              {time === 1
                ? `$${price} x ${time} night`
                : `$${price} x ${time} nights`}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              2% Cleaning fee
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              1% PeTrip fee
            </Typography>
          </>
        )}
        {/* <Typography sx={{ mb: 1.5 }} color='text.secondary'>
					${price} x {timeLapse} nights
				</Typography> */}
        <Typography variant="h6" sx={{ textAlign: "end" }}>
          Total ${totalCheckout}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", alignItems: "center" }}>
        <Box>
          {user?.id ? (
            <Button
              variant="contained"
              size="medium"
              sx={{ backgroundColor: "#F29278" }}
              onClick={() => {
                if (!logged) {
                  return;
                }
                handleOperationSubmit(
                  user.id,
                  caretakerProfile.id,
                  price,
                  datesRange,
                  time,
                  totalCheckout
                );
              }}
              disabled={user.id === caretakerProfile.id ? true : false}
            >
              Checkout
            </Button>
          ) : (
            <LoginModal
              openLogin={openLogin}
              handleLoginModal={handleLoginModal}
            />
          )}
        </Box>
      </CardActions>
    </>
  );
};
export const Ticket = ({ price, datesRange }) => {
  return (
    <Box sx={{ width: "90%" }}>
      <Card variant="outlined">
        <TicketCard price={price} datesRange={datesRange} />
      </Card>
    </Box>
  );
};
