import Cookies from "js-cookie";

import axios from "axios";
import client from "../config/axiosConfig";

import { types } from "../types";
import Swal from "sweetalert2";
import { data } from "autoprefixer";
import { errorNotify, successNotify } from "../helpers/helpers";

export const startLoadDataUser = (ctx) => {
  return async (dispatch) => {
    let url = "/auth";
    try {
      const token = ctx.req.cookies.token;
      const res = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      const { user } = res.data;
      dispatch(loadDataUser(user));
    } catch (error) {
      Cookies.remove("token");
    }
  };
};

export const loadDataUser = (user, token) => ({
  type: types.load_data_user,
  payload: user,
});

export const getStates = async () => {
  try {
    let url = "/states";
    const res = await client.get(url);
    return res.data.states;
  } catch (error) {
    console.log(error, "error 1 profile");
  }
};

export const getMinicipilitesPerState = async (id) => {
  let url = `/municipalities/${id}`;
  try {
    const res = await client.get(url);
    return res.data.municipalities;
  } catch (error) {
    console.log(error, "error 2 profile");
  }
};

export const getMinicipilitesPerStateToProfile = async (name) => {
  let url = `/municipalities/state-name/${name}`;
  try {
    const res = await client.get(url);
    return res.data.municipalities;
  } catch (error) {
    console.log(error, "error 3 profile");
  }
};

export const startSaveNewAddress = (data) => {
  return async (dispatch) => {
    let url = "auth/save-directions";
    try {
      const token = await Cookies.get("token");
      const res = await client.post(url, data, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(saveNewAddress(res.data.direction));
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
        message: "No se pudo guardar la dirección - intente mas tarde",
      };
    }
  };
};

export const startUpdateAddress = (data, _id) => {
  return async (dispatch) => {
    let url = `auth/update-directions/${_id}`;
    try {
      const token = await Cookies.get("token");
      const res = await client.put(url, data, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateAddress(res.data.directions));
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
        message: "No se pudo actualizar la dirección - intente mas tarde",
      };
    }
  };
};
export const updateAddress = (directions) => ({
  type: types.update_direction_user,
  payload: directions,
});

export const saveNewAddress = (direction) => ({
  type: types.add_new_address,
  payload: direction,
});

export const startGetDirections = (ctx) => {
  return async (dispatch) => {
    let url = "/auth/directions/user";
    try {
      const token = ctx.req.cookies.token;
      const res = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(getDirections(res.data.directions));
    } catch (error) {
      console.log(error, "error 4 profile");
    }
  };
};

export const getDirections = (directions) => ({
  type: types.load_directions,
  payload: directions,
});

export const selectDirection = (direction) => ({
  type: types.select_one_direction,
  payload: direction,
});

export const clearDirection = () => ({
  type: types.clear_direction,
});

export const setDefaultAddress = (data, id) => {
  return async (dispatch) => {
    let url = `/auth/update-default-direction/${id}`;

    try {
      const token = await Cookies.get("token");
      const res = await client.put(url, data, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data.success) {
        dispatch(changeDefaultAddress(id));
      }
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
        message: "No se pudo actualizar la dirección - intente mas tarde",
      };
    }
  };
};

export const changeDefaultAddress = (addres_id) => ({
  type: types.change_default_addres,
  payload: addres_id,
});

export const startDeleteAddress = (addres_id) => {
  return async (dispatch) => {
    let url = `/auth/delete-directions/${addres_id}`;
    try {
      const token = await Cookies.get("token");
      const res = await client.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data.success) {
        dispatch(deleteAddress(addres_id));
      }
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
        message: "No se pudo eliminar la dirección - intente mas tarde",
      };
    }
  };
};

export const deleteAddress = (addres_id) => ({
  type: types.delete_addres,
  payload: addres_id,
});

export const startUpdateDataUser = (formData) => {
  return async (dispatch) => {
    let url = `/auth/update-fullname`;
    try {
      const token = await Cookies.get("token");
      const { data } = await client.put(url, formData, {
        headers: {
          Authorization: token,
        },
      });
      successNotify(data.message);
      dispatch(updateDataUser(data.user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
      }

      errorNotify("No se pudo actualizar - Intenta más tarde");
    }
  };
};

export const updateDataUser = (user) => ({
  type: types.update_data_user,
  payload: user,
});

export const startUpdateImageUser = (formData) => {
  return async (dispatch) => {
    let url = `/auth/update-profile-image`;
    try {
      const token = await Cookies.get("token");
      const res = await client.put(url, formData, {
        headers: {
          Authorization: token,
        },
      });

      successNotify("Imagen de perfil actualizada satisfactoriamente");

      dispatch(updateImageUser(res.data.profileImage));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error?.response?.data?.message,
        };
      }

      return {
        hasError: true,
        message: "No se pudo eliminar la dirección - intente mas tarde",
      };
    }
  };
};

// export const cancelOrder = async (formData) => {

//     try {
//         const token = await Cookies.get('token');
//         let url = '/auth/update-phone-number';
//         const { data } = await client.post(url, formData, {
//             headers: {
//                 'Authorization': token
//             }
//         });

//         return {
//             hasError: false,
//             message: data?.message
//         }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             return {
//                 hasError: false,
//                 message: error?.response?.data?.message
//             }
//         }
//         return {
//             hasError: false,
//             message: "No se pudo cancelar la orden - Intenta más tarde"
//         }
//     }

// }

export const updateImageUser = (user) => ({
  type: types.update_image_user,
  payload: user,
});

export const startUpdatePhoneNumber = (phone_number) => {
  return async (dispatch) => {
    try {
      const token = await Cookies.get("token");
      let url = "/auth/update-phone-number";
      const { data } = await client.put(url, phone_number, {
        headers: {
          Authorization: token,
        },
      });

      successNotify(data.message);

      dispatch(loadDataUser(data.user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
        return;
      }

      errorNotify("No se pudo actualizar - Intenta más tarde");
    }
  };
};

export const startUpdatedPasswordClient = (password) => {
  return async () => {
    try {
      const token = await Cookies.get("token");
      let url = "/auth/changePassword";
      await client.post(url, password, {
        headers: {
          Authorization: token,
        },
      });

      successNotify("Contraseña actualizada satisfactoriamente");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error.response.data.message);
        return;
      }
      errorNotify("No se pudo actualizar el número - Intenta más tarde");
    }
  };
};

export const startGetStates = () => {
  return async (dispatch) => {
    try {
      let url = "/states";
      const { data } = await client.get(url);
      const states = data.states.map((state) => {
        const stateSelect = {
          label: state.name,
          value: state._id,
        };

        return stateSelect;
      });
      dispatch(getStatesData(states));
    } catch (error) {
      console.log(error, "error 5 profile");
    }
  };
};

export const getStatesData = (states) => ({
  type: types.load_states,
  payload: states,
});

export const startGetMunicipality = (state_id) => {
  return async (dispatch) => {
    try {
      let url = `/municipalities/${state_id}`;
      const { data } = await client.get(url);
      const municipalities = data.municipalities.map((municipality) => {
        const municipalitySelect = {
          label: municipality.name,
          value: municipality._id,
        };

        return municipalitySelect;
      });
      dispatch(getMunicipality(municipalities));
    } catch (error) {
      console.log(error, "error 6 profile");
    }
  };
};

export const getMunicipality = (municipalities) => ({
  type: types.load_municipalities,
  payload: municipalities,
});

/**
 * It's an async function that returns a function that dispatches an action creator that returns an
 * action object.
 * @param token - the token that is generated when the user logs in.
 * @returns an object with a type and a payload.
 */
export const startLoadFiscalAddress = (token) => {
  return async (dispatch) => {
    try {
      let url = "/auth/sat/direction";
      const { data } = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(loadFiscalAddress(data.SATDirection));
    } catch (error) {
      console.log(error, "error 7 profile");
    }
  };
};

/**
 * It returns an object with a type property and a payload property.
 * @param customer - {
 */
export const loadFiscalAddress = (customer, state, municipality) => ({
  type: types.load_fiscal_address,
  payload: {
    customer,
    // state,
    // municipality,
  },
});

/**
 * This function is an asynchronous function that returns a function that takes a dispatch function as
 * an argument.
 * @returns An object with a property of type and a property of payload.
 */
export const startAddFiscalAddress = (formData) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      let url = "/auth/save-sat-direction";
      const { data } = await client.post(url, formData, {
        headers: {
          Authorization: token,
        },
      });

      successNotify(data.message);

      dispatch(AddFiscalAddress(data.customer, data.state, data.municipality));
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
        return;
      }
    }
  };
};

/**
 * AddFiscalAddress is a function that takes a customer object as an argument and returns an object
 * with a type property and a payload property.
 * @param customer - {
 */
export const AddFiscalAddress = (customer, state, municipality) => ({
  type: types.save_fiscal_address,
  payload: {
    customer,
    state,
    municipality,
  },
});

export const startUpdateFiscalAddress = (fiscalAddress) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      let url = "/auth/update-sat-direction";
      const { data } = await client.put(url, fiscalAddress, {
        headers: {
          Authorization: token,
        },
      });

      successNotify(data.message);
      dispatch(
        updateFiscalAddress(data.customer, data.state, data.municipality)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
        return;
      }

      errorNotify(
        "No se pudo actualizar la dirección fiscal - Intenta más tarde"
      );
    }
  };
};

export const updateFiscalAddress = (customer, state, municipality) => ({
  type: types.update_fiscal_address,
  payload: {
    customer,
    state,
    municipality,
  },
});

/********************************** Get tax System *************************************************/

export const startLoadTaxSystem = (token) => {
  return async (dispatch) => {
    try {
      let url = "/tax_system";
      const { data } = await client.get(url, {
        headers: {
          Authorization: token,
        },
      });

      dispatch(loadTaxSystem(data.taxes));
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error?.response?.data?.message);
        return;
      }
    }
  };
};

const loadTaxSystem = (taxes) => ({
  type: types.laod_tax_system,
  payload: taxes,
});
