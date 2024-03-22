import client from "../config/axiosConfig";
import { types } from "../types";

/**
 * It's an async function that returns a function that returns a promise that returns a function that
 * returns
 * @returns an object with a type and a payload.
 */
export const startLoadAdministrableLogo = () => {
  return async (dispatch) => {
    try {
      let url = "administrable/logo";
      const { data } = await client.get(url);
      dispatch(loadAdministrableLogo(data.logo));
    } catch (error) {
      console.log(error, "error 1 administrable actions");
    }
  };
};

/**
 * This function returns an object with a type property and a payload property.
 * @param administrable - {
 */
export const loadAdministrableLogo = (administrable) => ({
  type: types.loadAdministrableLogo,
  payload: administrable,
});

//funcion para obtener los sliders
export const startLoadAdministrableSlider = () => {
  return async (dispatch) => {
    try {
      let url = "administrable/slider";
      const { data } = await client.get(url);
      dispatch(loadAdministrableSlider(data.sliders.slider));
    } catch (error) {
      console.log(error, "error 2 administrable actions");
    }
  };
};

export const loadAdministrableSlider = (sliders) => ({
  type: types.loadAdministrableSlider,
  payload: sliders,
});

/**
 * It's an async function that returns a function that returns a promise.
 * @returns an object with a type of 'LOAD_ADMINISTRABLE_ABOUT' and a payload of 'about'
 */
export const startLoadAdministrableAbout = () => {
  return async (dispatch) => {
    try {
      let url = "administrable/about";
      const { data } = await client.get(url);
      dispatch(loadAdministrableAbout(data.about));
    } catch (error) {
      console.log(error, "error 3 administrable actions");
    }
  };
};
/**
 * It takes an object as an argument and returns an object with a type and a payload.
 * @param about - {
 */

export const loadAdministrableAbout = (about) => ({
  type: types.loadAdministrableAbout,
  payload: about,
});

export const acceptCookies = () => ({
  type: types.accept_cookies_politicy,
});

export const startLoadCountryPermissions = () => {
  return async (dispatch) => {
    try {
      let url = "country-permissions";
      const { data } = await client.get(url);
      dispatch(loadCountryPermissions(data.countries));
    } catch (error) {
      console.log(error, "error 4 administrable actions");
    }
  };
};

const loadCountryPermissions = (countries) => ({
  type: types.load_country_permissions,
  payload: countries,
});

export const loadOneCountryPermissions = (permission) => ({
  type: types.load_one_country_permissions,
  payload: permission,
});

export const startLoadMaintainment = async () => {
  let url = `${process.env.REACT_APP_BACKEND_URL}/administrable/maintainment`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data.maintainment;
  } catch (error) {
    console.log(error, "error 5 administrable actions");
  }
};

export const startLoadPolicies = (type) => {
  return async (dispatch) => {
    try {
      let url = `policies/show/${type}`;
      const { data } = await client.get(url);
      dispatch(loadPolicies(data.policie));
    } catch (error) {
      console.log(error, "error 6 administrable actions");
    }
  };
};

export const loadPolicies = (policie) => ({
  type: types.load_policies,
  payload: policie,
});
