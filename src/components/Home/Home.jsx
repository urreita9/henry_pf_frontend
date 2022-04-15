import { Box, Container, Grid } from "@mui/material";
import { Mapa } from "../Map/Mapa";
import FilterBar from "../FilterBar/FilterBar";

export const Home = () => {
  return (
    <>
      <FilterBar />
      <Container
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          minHeight: "80%",

          marginLeft: "15%",
        }}
      >
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            {/* <div style={{ maxWidth: "70%", height: "500px" }}> */}
            <Box
              padding={1}
              sx={{
                width: "100%",
                height: "50vh",
              }}
            >
              <Mapa />
            </Box>
            {/* </div> */}
          </Grid>

          {/* <Grid item>
            <MapFilters />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};
