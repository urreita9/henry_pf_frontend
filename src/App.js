import NavBar from "./NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "./components/Profile/Profile";
const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <NavBar />
      {isAuthenticated && <Profile />}
    </>
  );
};

export default App;
