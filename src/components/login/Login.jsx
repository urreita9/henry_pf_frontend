import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      sx={{
        backgroundColor: "#cc3308",
      }}
      variant="contained"
      onClick={() => loginWithRedirect()}
    >
      Login
    </Button>
  );
};
