import { types } from "../types";

import client from "../config/axiosConfig";

export const startLoadFaqs = () => {
  return async (dispatch) => {
    let url = "/faq";
    try {
      const res = await client.get(url);
      dispatch(loadFaqs(res.data.faqs));
    } catch (error) {
      console.log(error, "error 1 faqs");
    }
  };
};

export const loadFaqs = (faqs) => ({
  type: types.load_faqs,
  payload: faqs,
});

export const startLoadFaqsCategories = () => {
  return async (dispatch) => {
    let url = "/faq-category";
    try {
      const res = await client.get(url);
      dispatch(loadFaqsCategories(res.data.faqCategory));
    } catch (error) {
      console.log(error, "error 2 faqs");
    }
  };
};

export const loadFaqsCategories = (faqs) => ({
  type: types.load_faqs_categories,
  payload: faqs,
});

export const startLoadFaqsPerCategories = (category_id) => {
  return async (dispatch) => {
    let url = `/faq/category/${category_id}`;
    try {
      const res = await client.get(url);
      dispatch(loadFaqsPerCategories(res.data.faqs));
    } catch (error) {
      console.log(error, "error 3 faqs");
    }
  };
};

export const loadFaqsPerCategories = (faqs) => ({
  type: types.load_faqs_per_category,
  payload: faqs,
});
