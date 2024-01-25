import Cookies from "js-cookie";
import client from "../config/axiosConfig";
import { types } from "../types";

import axios from "axios";

/**
 * It's an async function that returns a function that returns a promise.
 * @param data - {
 * @returns A function that returns a function that returns a boolean.
 */
export const startLoginEmailPassword = (data) => {
  return async (dispatch) => {
    try {
      let url = "/auth/login";
      const res = await client.post(url, data);
      const { token, user } = res.data;
      await Cookies.set("token", token);
      dispatch(login(token, user));
      return {
        hasError: false,
        token,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error?.response?.data?.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente mas tarde",
      };
    }
  };
};

/**
 * This function returns an object with a type property and a payload property.
 * @param token - The token that was returned from the server
 * @param user - {
 */
export const login = (token, user) => ({
  type: types.login,
  payload: {
    token,
    user,
  },
});

/**
 * It takes an idToken from Google, sends it to the server, and if the server returns a token and user,
 * it sets the token in a cookie and dispatches the loginGoogle action.
 * @param idToken - The ID token that was returned by the Google Sign-In SDK.
 * @returns The token and user object.
 */
export const startLoginGoogle = (idToken) => {
  return async (dispatch) => {
    try {
      let url = "/auth/login-google";
      const res = await client.post(url, { idToken });
      const { token, user } = res.data;
      Cookies.set("token", token);
      dispatch(loginGoogle(token, user));
      return {
        hasError: false,
        token,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error?.response?.data?.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente mas tarde",
      };
    }
  };
};

/**
 * It returns an object with a type and a payload.
 *
 * The type is a string that is defined in the types.js file.
 *
 * The payload is an object that contains the token and the user.
 *
 * The token is the token that is returned from the Google API.
 *
 * The user is the user object that is returned from the Google API.
 *
 * The token and the user are passed into the function as parameters.
 * @param token - The token that was returned from the Google API.
 * @param user - {
 */
export const loginGoogle = (token, user) => ({
  type: types.loginGoogle,
  payload: {
    token,
    user,
  },
});

/**
 * It's an async function that makes a post request to the server, and if the request is successful, it
 * sets a cookie and dispatches an action.
 * @param data - {
 * @returns An object with two properties: hasError and message.
 */
export const startRegister = (data) => {
  return async (dispatch) => {
    let url = "/auth/register";
    try {
      const res = await client.post(url, data);
      const { user, token } = res.data;
      Cookies.set("token", token);
      dispatch(register(user, token));
      return {
        hasError: false,
        token,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error?.response?.data?.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente mas tarde",
      };
    }
  };
};

/**
 * It returns an object with a type and a payload.
 *
 * The type is a string that is defined in the types.js file.
 *
 * The payload is an object that contains the user and the token.
 *
 * The user and token are passed in as parameters.
 *
 * The user and token are passed
 * @param user - {
 * @param token - The token that was returned from the server
 */
export const register = (user, token) => ({
  type: types.register,
  payload: {
    user,
    token,
  },
});

/**
 * It's an async function that dispatches a function that verifies a token.
 * @returns an object with a type and a payload.
 */
export const startVerifyToken = (accessToken) => {
  return async (dispatch) => {
    let url = "/auth";
    try {
      const res = await client.get(url, {
        headers: {
          Authorization: accessToken,
        },
      });
      const { user, token } = res.data;
      dispatch(verifyToken(user, token));
      Cookies.set("token", token);
    } catch (error) {
      Cookies.remove("token");
    }
  };
};

/**
 * VerifyToken is a function that returns an object with a type and a payload property.
 * @param user - {
 * @param token - the token that was sent to the user's email
 */
export const verifyToken = (user, token) => ({
  type: types.check_token,
  payload: {
    user,
    token,
  },
});

/**
 * It returns an object with a type property
 */
export const logout = () => ({
  type: types.logout,
});

/**
 * It sends a post request to the server with the data and the token, and returns a message.
 * </code>
 * @param data - {
 * @returns An object with two properties: hasError and message.
 */
export const startChangePassword = async (data) => {
  let url = "auth/changePassword";
  try {
    const token = await Cookies.get("token");
    const res = await client.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
    return {
      hasError: false,
      message: res?.data?.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error?.response?.data?.message,
      };
    }

    return {
      hasError: true,
      message: "No se pudo cambiar la contraseña - intente mas tarde",
    };
  }
};

/**
 * It sends a post request to the server with the email address of the user who forgot their password.
 * @param email - {
 * @returns An object with two properties: hasError and message.
 */
export const forgotPassword = async (email) => {
  let url = "/auth/forgot-password";
  try {
    const res = await client.post(url, email);
    return {
      hasError: false,
      message: res?.data?.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error?.response?.data?.message,
      };
    }

    return {
      hasError: true,
      message: "No se pudo enviar el correo - Intente más tarde",
    };
  }
};

/**
 * It sends a POST request to the server with the form data, and returns an object with a boolean and a
 * message
 * @param formData - {
 * @returns An object with two properties: hasError and message.
 */
export const resetPassword = async (formData) => {
  let url = "/auth/reset-password";
  try {
    const res = await client.post(url, formData);
    return {
      hasError: false,
      message: res?.data?.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error?.response?.data?.message,
      };
    }

    return {
      hasError: true,
      message: "No se pudo restablecer la contraseña - Intente más tarde",
    };
  }
};

/**
 * It sends a GET request to the backend with the token as a header, and returns the user object
 * @param token - the token that was sent to the user's email
 * @returns The user object
 */
export const emailVerified = async (token) => {
  let url = `${process.env.REACT_APP_BACKEND_URL}/auth`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    return data.user;
  } catch (error) {
    return {
      hasError: true,
      message: "No se pudo enviar el correo - Intente más tarde",
    };
  }
};

/**
 * It sends a GET request to the backend to check if the user has items in their cart.
 * @param token - "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYzY1YzUzYzY5YzYwMDAxM
 * @returns The response from the server.
 */
export const cartNotEmpty = async (token) => {
  let url = `${process.env.REACT_APP_BACKEND_URL}/cart`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      hasError: true,
      message: "No se pudo enviar el correo - Intente más tarde",
    };
  }
};

/**
 * It sends a post request to the backend with the email of the user and the token of the user.
 * </code>
 * @param email - email
 * @returns {
 *     hasError: false,
 *     message: "Email enviado"
 * }
 */
export const startResendEmail = async (email) => {
  let url = "auth/resend-email";
  try {
    const token = Cookies.get("token");
    const res = await client.post(
      url,
      { email: email },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return {
      hasError: false,
      message: res?.data?.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error?.response?.data?.message,
      };
    }

    return {
      hasError: true,
      message: "No se encontro tu correo - Intente más tarde",
    };
  }
};
