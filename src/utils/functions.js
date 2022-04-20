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
