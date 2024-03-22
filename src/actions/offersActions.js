import client from "../config/axiosConfig";
import { types } from "../types";

export const startLoadOffers = () => {
  return async (dispatch) => {
    let url = "/offers";
    try {
      const res = await client.get(url);
      dispatch(loadOffers(res.data.offers));
    } catch (error) {
      console.log(error, "error 1 offer");
    }
  };
};

export const loadOffers = (offers) => ({
  type: types.loadOffers,
  payload: offers,
});
