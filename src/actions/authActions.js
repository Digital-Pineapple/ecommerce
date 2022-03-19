import Cookies from 'js-cookie';
import client from '../config/axiosConfig';
import { types } from '../types';
import errorHandler from './errorHandler';

import { toast } from 'react-toastify';

const notify = (error) => toast(error);

export const startLoginEmailPassword = (data) => {
    return async (dispatch) => {
        let url = 'auth/login'
        try {
            const res = await client.post(url, data);
            const { token, user } = res.data;
            Cookies.set('token', token)
            dispatch(login(token, user));   
        } catch (error) {
            notify("Error de usuario / contraseña")         
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
        let url = '/auth/register'
        try {
            const res = await client.post(url, data);
            const { user, token } = res.data;
            Cookies.set('token', token)
            dispatch(register(user, token))
        } catch (error) {
            notify("EL usuario ya existe, intenta con otro correo")         
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
            const oldToken = Cookies.get('token')
            const res = await client.get(url, {
                headers: {
                    'Authorization': oldToken
                }
            });
            const { user, token } = res.data;
            dispatch(verifyToken(user, token))
        } catch (error) {
            Cookies.remove('token');
            return errorHandler(error);
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
        const res = await client.post(url, data,{
            headers: {
                'Authorization': token
            }
        });
        console.log(res.data)
    } catch (error) {
        alert(errorHandler(error))
    }
}
