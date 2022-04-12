import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="btn btn-danger
    "
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </button>
  );
};
