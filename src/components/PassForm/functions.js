export const checkRegForm = ({ name, lastname, email, password, repeat }) => {
  const e = {
    state: false,
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeat: "",
  };

  if (name) {
    if (name.length < 3) {
      e.name = "El nombre debe tener al menos 3 caracteres";
      e.state = true;
    }
  } else {
    e.name = "El nombre es requerido";
    e.state = true;
  }

  if (lastname) {
    if (lastname.length < 3) {
      e.lastname = "El apellido debe tener al menos 3 caracteres";
      e.state = true;
    }
  } else {
    e.lastname = "El apellido es requerido";
    e.state = true;
  }

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
  if (password && repeat) {
    if (password !== repeat) {
      e.repeat = "Las contraseñas no coinciden";
      e.state = true;
    }
  }

  if (!repeat) {
    e.repeat = "Campo necesario";
    e.state = true;
  }
  return e;
};
