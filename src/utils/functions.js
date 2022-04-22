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

export const checkFormProfile = ({ name, lastname, img, address }) => {
    const e = {
        state: false,
        name: '',
        lastname: '',
        address: '',
        img: '',
    };

    if (img) {
        if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(img)) {
            e.img = 'La img debe ser una URL';
            e.state = true;
        }
        if (!/(.img)|(.svg)|(.png)|(.jpg)|(.gif)/.test(img)) {
            e.img = 'La img debe ser una imagen';
            e.state = true;
        }
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

    // [e.state, e.actual] = checkOne(actual, actual.length < 6, 'La contraseña debe tener al menos 6 digitos', e);
    // console.log(e);
    // [e.state, e.actual] = checkOne(!actual, true, 'Campo necesario', e.state, e.actual);

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
