import Cookies from 'js-cookie';
import client from '../config/axiosConfig';
import { types } from '../types';


import axios from 'axios';


export const startLoginEmailPassword = (data) => {

    return async (dispatch) => {
       
        try {
            let url = '/auth/login';
            const res = await client.post(url, data);
            const { token, user } = res.data;
            Cookies.set('token', token);
            dispatch(login(token, user));
            return true;

        } catch (error) {
            return false;
        }
    }
}

export const login = (token, user) => ({
    type: types.login,
    payload: {
        token,
        user
    }
});

export const startRegister = (data) => {

    return async (dispatch) => {
        let url = '/auth/register';
        try {
            const res = await client.post(url, data);
            const { user, token } = res.data;
            Cookies.set('token', token);
            dispatch(register(user, token));
            return {
                hasError: false
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response.data.message
                }
            }

            return {
                hasError: true,
                message: "No se pudo crear el usuario - intente mas tarde"
            }
        }
    }
}


export const register = (user, token) => ({
    type: types.register,
    payload: {
        user,
        token,
    }
});

export const startVerifyToken = () => {
    return async (dispatch) => {
        let url = '/auth'
        try {
            const oldToken = Cookies.get('token');
            const res = await client.get(url, {
                headers: {
                    'Authorization': oldToken
                }
            });
            const { user, token } = res.data;
            dispatch(verifyToken(user, token))
        } catch (error) {
            Cookies.remove('token');
        }
    }
}


export const verifyToken = (user, token) => ({
    type: types.check_token,
    payload: {
        user,
        token,
    }
});


export const logout = () => ({
    type: types.logout,
})


export const startChangePassword = async (data) => {
    let url = 'auth/changePassword'
    try {
        const token = await Cookies.get('token');
        const res = await client.post(url, data, {
            headers: {
                'Authorization': token
            }
        });
        return {
            hasError: flase,
            message: res?.data?.message,
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                hasError: true,
                message: error?.response?.data?.message
            }
        }

        return {
            hasError: true,
            message: "No se pudo cambiar la contraseña - intente mas tarde"
        }
    }
}
