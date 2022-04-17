import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, marginTop: "50px" }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Nombre Apellido
        </Typography> */}
        <Typography variant="h5" component="div">
          Nombre{bull}Apellido{bull}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Edad, genero, direccion
        </Typography>
        <Typography variant="body2">
          Aca una breve descripcion de lo que hace el usuario
          <br />
          {'"Mis perros son mi vida"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
