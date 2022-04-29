import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Rating } from "@mui/material";

import { Link } from "react-router-dom";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#F29279",
  },
});

export default function PopUpData({ person }) {
  // const { id, name } = person;
  // console.log(person);
  console.log("POPUP ", person);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Avatar alt="Remy Sharp" src={person.user.img} />
        <Typography component="legend" textAlign={"end"}>
          {person.user.name} {person.user.lastname}
        </Typography>
      </Box>

      <Typography component="legend">${person.price}</Typography>
      <StyledRating
        precision={0.5}
        name="read-only"
        value={person.rating}
        readOnly
        size="small"
        icon={<PetsOutlinedIcon fontSize="inherit" />}
        emptyIcon={<PetsOutlinedIcon fontSize="inherit" />}
      />
      <Link
        to={`/caretaker/${person.user.id}`}
        style={{ textDecoration: "none" }}
      >
        <Button>Detail</Button>
      </Link>
    </Box>
  );
}
