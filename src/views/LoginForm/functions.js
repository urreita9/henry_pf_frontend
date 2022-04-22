export const checkLoginForm = ({ email, password }) => {
  const e = {
    state: false,
    email: "",
    password: "",
  };

  if (email) {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      e.email = "El email debe ser un email valido";
      e.state = true;
    }
  } else {
    e.email = "El email es requerido";
    e.state = true;
  }

  if (password) {
    if (password.length < 6) {
      e.password = "La contraseña debe tener al menos 6 caracteres";
      e.state = true;
    }
  } else {
    e.password = "Campo necesario";
    e.state = true;
  }
  return e;
};
