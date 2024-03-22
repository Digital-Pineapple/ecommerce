import client from "../config/axiosConfig";
import { types } from "../types";

export const startLoadTags = () => {
  return async (dispatch) => {
    let url = "/tags";
    try {
      const res = await client.get(url);
      dispatch(loadTags(res.data.tags));
    } catch (error) {
      console.log(error, "error 1 tags");
    }
  };
};

export const loadTags = (tags) => ({
  type: types.loadTags,
  payload: tags,
});
