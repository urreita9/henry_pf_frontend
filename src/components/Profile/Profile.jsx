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
        <img className={Style.image} src={user.picture} alt={user.name} />
      </div>
    )
  );
};
