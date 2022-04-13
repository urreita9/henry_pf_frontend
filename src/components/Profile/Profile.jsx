import { useAuth0 } from "@auth0/auth0-react";
import Style from "./ProfileStyle.module.css";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h1 className={Style.titulo}>Welcome Back: {user.name}</h1>
      </div>
    )
  );
};
