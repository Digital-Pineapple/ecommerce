import client from "../config/axiosConfig";
import { types } from "../types";
import { clearSubcategory } from "./productsAction";

/**
 * It's an async function that returns a function that dispatches a function that returns a promise
 * that dispatches a function.
 * @returns An object with a type and a payload.
 */
export const startLoadCategories = () => {
  return async (dispatch) => {
    let url = "/categories";
    try {
      const res = await client.get(url);
      dispatch(loadCategories(res.data.categories));
    } catch (error) {
      console.log(error, "error 1 category");
    }
  };
};

/**
 * It returns an object with a type property and a payload property.
 *
 * The type property is a string that is the same as the string in the types object.
 *
 * The type property is the string that is the same as the string in the types object.
 *
 * The payload property is the data that is passed into the function.
 *
 * The function is called with the data that is to be passed into the payload property.
 *
 * The function returns an object with the type property and the payload property.
 *
 * The type property is the string that is the same as the string
 * @param categories - Array of category objects
 */
export const loadCategories = (categories) => ({
  type: types.loadCategories,
  payload: categories,
});

/**
 * It's an async function that dispatches an action to the reducer.
 * @returns An object with a type and a payload.
 */
export const startLoadCategoriesHome = () => {
  return async (dispatch) => {
    let url = "/categories/categories-home";
    try {
      const res = await client.get(url);
      dispatch(loadCategoriesHome(res.data.categories));
    } catch (error) {
      console.log(error, "error 2 category");
    }
  };
};
/**
 * It takes an array of categories and returns an object with a type and a payload.
 * @param categories - [{id: 1, name: 'category1'}, {id: 2, name: 'category2'}]
 */

export const loadCategoriesHome = (categories) => ({
  type: types.loadCategoriesHome,
  payload: categories,
});

/**
 * It's an async function that returns a function that dispatches an action creator that returns an
 * action object.
 * @param category - the category name
 * @returns an object with a type of "LOAD_PRODUCTS_PER_CATEGORY" and a payload of the category.
 */
export const startLoadProductsPerCategory = (category) => {
  return async (dispatch) => {
    let url = `/categories/slug/${category}`;
    try {
      const res = await client.get(url);
      dispatch(loadProductsPerCategory(res.data.category));
    } catch (error) {
      console.log(error, "error 3 category");
    }
  };
};

/**
 * It returns an object with a type and a payload.
 * @param category - the category of the products to be loaded
 */
export const loadProductsPerCategory = (category) => ({
  type: types.load_products_from_category,
  payload: category,
});

/********************+filtro de productos en categorias *******************************/
export const startFilterProductsPerBrandAndCategory = (brand, category_id) => {
  return async (dispatch) => {
    const url = `/products/brands/categories/${brand._id}/${category_id}`;
    try {
      const res = await client.get(url);
      dispatch(filterProductsPerBrandAndCategory(brand, res.data.products));
    } catch (error) {
      console.log(error, "error 4 category");
    }
  };
};

/**
 * It takes a brand and a list of products and returns an object with a type and a payload.
 *
 * The payload is an object with a filter and a list of products.
 *
 * The filter is the brand.
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
 * @param brand - is the brand name
 * @param products - is an array of objects
 */
export const filterProductsPerBrandAndCategory = (brand, products) => ({
  type: types.filters_to_products_from_categories_with_brands,
  payload: {
    filter: brand,
    products,
  },
});

/**
 * It's an async function that takes a dispatch function as an argument, and returns a promise that
 * resolves to a dispatch function that takes a tag and an array of products as arguments.
 * @param tag - {
 * @returns a function that takes dispatch as a parameter.
 */
export const startloadProductsPerTagsInCategory = (tag) => {
  return async (dispatch) => {
    let url = `/products/tag/${tag._id}`;
    try {
      const res = await client.get(url);
      dispatch(loadProductsPerTags(tag, res.data.products));
    } catch (error) {
      console.log(error, "error 5 category");
    }
  };
};

/**
 * This function takes a tag and a list of products and returns an object with a type and a payload.
 * @param tag - is the tag that is clicked on
 * @param products - is an array of objects
 */
export const loadProductsPerTags = (tag, products) => ({
  type: types.filters_to_products_from_categories_with_brands,
  payload: {
    filter: tag,
    products,
  },
});

/**
 * It returns an object with a type property and a value of clear_filters_form_categories.
 */
export const clearAll = () => ({
  type: types.clear_filters_form_categories,
});

export const startLoadCategoriesPerBrand = (brand) => {
  return async (dispatch) => {
    const url = `/categories/brand-slug/${brand}`;
    try {
      const { data } = await client.get(url);
      dispatch(loadCategoriesPerBrand(data.categories));
    } catch (error) {
      console.log(error, "error 6 category");
    }
  };
};

const loadCategoriesPerBrand = (categories) => ({
  type: types.load_categories_per_brand,
  payload: categories,
});

export const startLoadSubcategoriesPerCategory = (category) => {
  return async (dispatch) => {
    const url = `/subcategories/category/${category}`;
    try {
      const { data } = await client.get(url);
      dispatch(clearSubcategory(4));
      dispatch(loadSubcategoriesPerCategory(data.subcategories));
      dispatch(showSubcategory(true));
    } catch (error) {
      console.log(error, "error 7 category");
    }
  };
};

export const startLoadSubcategoriesPerCategoryBySlug = (category) => {
  return async (dispatch) => {
    const url = `/subcategories/category-slug/${category}`;
    try {
      const { data } = await client.get(url);
      dispatch(loadSubcategoriesPerCategory(data.subcategories));
    } catch (error) {
      console.log(error, "error 8 category");
    }
  };
};

const loadSubcategoriesPerCategory = (subcategories) => ({
  type: types.load_subcategories_per_category_or_per_brand,
  payload: subcategories,
});

export const startLoadSubcategoriesPerBrand = (brand) => {
  return async (dispatch) => {
    const url = `/subcategories/brand-slug/${brand}`;
    try {
      const { data } = await client.get(url);
      dispatch(loadSubcategoriesPerBrand(data.subcategories));
    } catch (error) {
      console.log(error, "error 9 category");
    }
  };
};

const loadSubcategoriesPerBrand = (subcategories) => ({
  type: types.load_subcategories_per_category_or_per_brand,
  payload: subcategories,
});

const showSubcategory = (isOpen) => ({
  type: types.show_subcategories,
  payload: isOpen,
});

export const clearSubcategories = () => ({
  type: types.clear_subcategories,
});
