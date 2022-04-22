import api from '../axios';

export const capitalize = (string = '') => {
    if (typeof string === 'string' && string.length) {
        const resp = string.split('')[0].toUpperCase() + string.slice(1, string.length);

        return resp;
    }

    return string;
};

export const deletePet = async (token, id) => {
    try {
        const { data } = await api.delete(`/pets/${id}`, {
            headers: {
                'x-token': token,
            },
        });

        return data;
    } catch (error) {
        const data = error.response.data;
        console.log(data);
    }
};

export const checkFormPet = ({ name, age, img }) => {
    const e = {
        state: false,
        name: '',
        age: '',
        img: '',
    };

    if (name) {
        if (!/^[a-zA-Z ]{0,16}$/.test(name)) {
            e.state = true;
            e.name = 'Solo letras y espacios';
        }
    } else {
        e.state = true;
        e.name = 'Campo necesario';
    }

    if (age) {
        if (age > 25) {
            e.state = true;
            e.age = 'Edad maxima 25 años';
        }
        if (age < 0) {
            e.state = true;
            e.age = 'Edad minima 1 año';
        }
    } else {
        e.state = true;
        e.age = 'Campo necesario';
    }

    if (!img) {
        e.state = true;
        e.img = 'Campo necesario';
    }

    return e;
};

export const checkPassword = async (token, uid, password) => {
    try {
        const { data } = await api.post(
            `/users/check/password`,
            { password },
            {
                headers: {
                    'x-token': token,
                    uid: uid,
                },
            }
        );

        return data;
    } catch (error) {
        const data = error.response.data;
        console.log(data);
    }
};

export const checkFormProfile = ({ name, lastname, address }) => {
    const e = {
        state: false,
        name: '',
        lastname: '',
        address: '',
    };

    if (name) {
        if (!/^[a-zA-Z ]{0,16}$/.test(name)) {
            e.state = true;
            e.name = 'Solo letras y espacios';
        }
    } else {
        e.state = true;
        e.name = 'Campo necesario';
    }

    if (lastname) {
        if (!/^[a-zA-Z ]{0,16}$/.test(lastname)) {
            e.state = true;
            e.lastname = 'Solo letras y espacios';
        }
    } else {
        e.state = true;
        e.lastname = 'Campo necesario';
    }

    if (address) {
        if (!/^[a-zA-Z0-9. ]{0,16}$/.test(address)) {
            e.state = true;
            e.address = 'Solo letras, espacios, puntos y numeros';
        }
        if (address.length > 16) {
            e.state = true;
            e.address = 'Maximo 16 caracteres';
        }
    } else {
        e.state = true;
        e.address = 'Campo necesario';
    }

    return e;
};

const checkOne = (param, validacion, msg, e) => {
    if (param) {
        if (validacion) {
            return [true, msg];
        }
        return [e.state, e[param]];
    }
    return [e.state, e[param]];
};

export const checkFormPass = ({ actual, new: newPass, repeat }) => {
    const e = {
        state: false,
        actual: '',
        new: '',
        repeat: '',
    };

    if (actual) {
        if (actual.length < 6) {
            e.state = true;
            e.actual = 'La contraseña debe tener al menos 6 digitos';
        }
        if (actual.includes(' ')) {
            e.state = true;
            e.actual = 'No se permiten espacios';
        }
    } else {
        e.state = true;
        e.actual = 'Campo necesario';
    }

    ///////////////////////
    if (newPass && repeat) {
        if (newPass !== repeat) {
            e.state = true;
            e.new = 'Contraseñas no coinciden';
            e.repeat = 'Contraseñas no coinciden';
        }
    }

    if (newPass && actual) {
        if (newPass === actual) {
            e.state = true;
            e.new = 'La contraseña actual y nueva no pueden ser iguales';
            e.actual = 'La contraseña actual y nueva no pueden ser iguales';
        }
    }

    if (newPass) {
        if (newPass.length < 6) {
            e.state = true;
            e.new = 'La contraseña debe tener al menos 6 digitos';
        }
        if (newPass.includes(' ')) {
            e.state = true;
            e.new = 'No se permiten espacios';
        }
    } else {
        e.state = true;
        e.new = 'Campo necesario';
    }

    if (!repeat) {
        e.state = true;
        e.repeat = 'Campo necesario';
    }

    return e;
};
