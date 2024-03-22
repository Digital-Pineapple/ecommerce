import Cookies from "js-cookie";
import client from "../config/axiosConfig";
import { types } from "../types";
import { loadCategories } from "./categoryActions";

/**
 * It's an async function that dispatches a function that returns a promise that returns a function
 * that returns a promise that returns a function that returns a promise that returns a function that
 * @returns An object with a type and a payload.
 */
export const startLoadBrandsHome = () => {
  return async (dispatch) => {
    let url = "/brands";

    try {
      const res = await client.get(url);
      dispatch(loadBrandsHome(res.data.brands));
    } catch (error) {
      console.log(error, "error 1 brand");
    }
  };
};

/**
 * It's an async function that dispatches a function that returns a promise that returns a function
 * that returns a promise that returns a function that dispatches a function that returns a promise
 * that returns a function that dispatches a function that returns a promise that returns a function
 * that dispatches a function that returns a promise that returns a function that dispatches a function
 * that returns a
 * @returns An object with a type and a payload.
 */
export const startLoadBrands = () => {
  return async (dispatch) => {
    let url = "/brands";
    try {
      const res = await client.get(url);
      dispatch(loadBrands(res.data.brands));
    } catch (error) {
      console.log(error, "error 2 brand");
    }
  };
};

/**
 * This function returns an object with a type and a payload property.
 * @param brands - [{id: 1, name: 'brand1'}, {id: 2, name: 'brand2'}]
 */
export const loadBrandsHome = (brands) => ({
  type: types.loadBrandsHome,
  payload: brands,
});

/**
 * This function returns an object with a type property and a payload property.
 * @param brands - [{id: 1, name: 'brand1'}, {id: 2, name: 'brand2'}]
 */
export const loadBrands = (brands) => ({
  type: types.loadBrands,
  payload: brands,
});

export const startLoadBrandsWithCategories = (currency) => {
  return async (dispatch) => {
    let url = "/brands/with/categories";

    try {
      const res = await client.get(url, {
        headers: {
          Currency: currency,
        },
      });
      dispatch(loadBrandsWithCategories(res.data.brands));
    } catch (error) {
      console.log(error, "error 3 brand");
    }
  };
};

export const loadBrandsWithCategories = (brands) => ({
  type: types.loadBrandsWithCategories,
  payload: brands,
});

export const startLoadCategoriesWithProducts = (category_id, brand_id) => {
  return async (dispatch) => {
    const currency = Cookies.get("Currency") || "MXN";
    let url = `/products/category-brand-pagination/${category_id}/${brand_id}`;

    try {
      const res = await client.get(url, {
        headers: {
          Currency: currency,
        },
      });
      dispatch(loadCategoriesWithProducts(res.data.products, brand_id));
    } catch (error) {
      console.log(error, "error 4 brand");
    }
  };
};

export const loadCategoriesWithProducts = (products, brand_id) => ({
  type: types.loadCategoriesWithProducts,
  payload: {
    products,
    brand_id,
  },
});

/**
 * It's an async function that takes a dispatch function as an argument, and returns a promise that
 * resolves to a dispatch function that takes a loadProductsPerBrand action creator as an argument.
 * @param brand - the brand name
 * @returns an object with a type of "LOAD_PRODUCTS_PER_BRAND" and a payload of the brand.
 */
export const startLoadProductsPerBrand = (brand) => {
  return async (dispatch) => {
    let url = `/brands/slug/${brand}`;
    try {
      const res = await client.get(url);
      dispatch(loadProductsPerBrand(res.data.brand));
    } catch (error) {
      console.log(error, "error 5 brand");
    }
  };
};

/**
 * This function returns an object with a type and a payload property.
 * @param brand - the brand name
 */
export const loadProductsPerBrand = (brand) => ({
  type: types.load_products_from_brand,
  payload: brand,
});

/*                  filtros         */
/**
 * It's a function that takes in a brand and a category, and then it returns a function that takes in a
 * dispatch function, and then it makes an API call to the server, and then it dispatches an action
 * with the category and the products that were returned from the server.
 * @param brand - {_id: "5e8f8f8f8f8f8f8f8f8f8f8f", name: "Nike"}
 * @param category - {
 * @returns The data is being returned as an array of objects.
 */
export const startFilterProductsPerBrandAndCategory = (brand, category) => {
  return async (dispatch) => {
    const url = `/products/brands/categories/${brand._id}/${category._id}`;
    try {
      const res = await client.get(url);
      dispatch(filterProductsPerBrandAndCategory(category, res.data.products));
    } catch (error) {
      console.log(error, "error 6 brand");
    }
  };
};

/**
 * It takes a category and a list of products and returns an object with a type and a payload.
 *
 * The payload is an object with a filter and a list of products.
 *
 * The filter is the category.
 *
 * The list of products is the list of products.
 *
 * The type is a string.
 *
 * The string is a constant.
 *
 * The constant is a string.
 *
 * The string is a string.
 * @param category - the category that was selected
 * @param products - is an array of objects
 */
export const filterProductsPerBrandAndCategory = (category, products) => ({
  type: types.filters_to_products_from_brand,
  payload: {
    filter: category,
    products,
  },
});

/**
 * It returns an object with a type property and a value of clear_all_filter_from_brands.
 */
export const clearAll = () => ({
  type: types.clear_all_filter_from_brands,
});

/**
 * It's an async function that returns a function that dispatches an action creator that returns an
 * action object.
 * @param tag - {
 * @returns a function that takes dispatch as a parameter.
 */
export const startloadProductsPerTagsInBrand = (tag) => {
  return async (dispatch) => {
    let url = `/products/tag/${tag._id}`;
    try {
      const res = await client.get(url);
      dispatch(loadProductsPerTags(tag, res.data.products));
    } catch (error) {
      console.log(error, "error 7 brand");
    }
  };
};

/**
 * This function takes a tag and a list of products and returns an object with a type and a payload.
 * @param tag - "brand"
 * @param products - [{id: 1, name: 'product1', tags: ['tag1', 'tag2']}, {id: 2, name: 'product2',
 * tags: ['tag1', 'tag3']}]
 */
export const loadProductsPerTags = (tag, products) => ({
  type: types.filters_to_products_from_brand,
  payload: {
    filter: tag,
    products,
  },
});

export const existBrand = async () => {
  let url = `${process.env.REACT_APP_BACKEND_URL}/brands`;
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    return data.brands;
  } catch (error) {
    return {
      hasError: true,
      message: "No se pudo enviar el correo - Intente más tarde",
    };
  }
};

export const startLoadSubcategories = () => {
  return async (dispatch) => {
    const url = "/subcategories";
    try {
      const { data } = await client.get(url);
      dispatch(loadSubcategories(data.subcategories));
    } catch (error) {
      console.log(error, "error 8 brand");
    }
  };
};

const loadSubcategories = (subcategories) => ({
  type: types.load_subcategories,
  payload: subcategories,
});

export const startLoadBrandsPerCategory = (category) => {
  return async (dispatch) => {
    const url = `/brands/brands-per-category/${category}`;
    try {
      const { data } = await client.get(url);
      dispatch(loadBrandPerCategory(data.brands));
    } catch (error) {
      console.log(error, "error 9 brand");
    }
  };
};

const loadBrandPerCategory = (brands) => ({
  type: types.load_brands_per_category,
  payload: brands,
});
