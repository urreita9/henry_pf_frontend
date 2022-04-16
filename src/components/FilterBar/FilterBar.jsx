import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MapFilters } from "../MapFilters/MapFilters";
import { Button, ButtonGroup, Stack } from "@mui/material";

export default function FilterBar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "center",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "1%",
      }}
    >
      <AppBar
        position="relative"
        sx={{ backgroundColor: "#e5bcb1", borderRadius: "10px" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Filter by:
          </Typography>
          <MapFilters />
          {/* <Stack direction="row">
            <ButtonGroup
              color="primary"
              variant="contained"
              size="large"
              disableElevation
            >
              <Button> Size</Button>
              <Button> Size</Button>
              <Button> Size</Button>
            </ButtonGroup>
          </Stack> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
