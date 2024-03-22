import Cookies from "js-cookie";
import Swal from "sweetalert2";
import client from "../config/axiosConfig";
import { types } from "../types";
import axios from "axios";

export const startLoadReviews = () => {
  return async (dispatch) => {
    const url = "/reviews";
    try {
      const res = await client.get(url);
      dispatch(loadReviews(res.data.reviews));
    } catch (error) {
      console.log(error, "error 1 reviews");
    }
  };
};

export const loadReviews = (reviews) => ({
  type: types.start_load_reviews,
  payload: reviews,
});

export const startSendReview = async (data) => {
  const url = "/reviews";
  try {
    const token = Cookies.get("token");
    const res = await client.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
    Swal.fire({
      icon: "success",
      title: res.data.message,
      timer: 1500,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Swal.fire({
        icon: "error",
        title: error?.response?.data?.message,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Algo salio mal - intenta mas tarde",
      timer: 1500,
    });
  }
};
