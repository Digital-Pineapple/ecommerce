import client from '../config/axiosConfig';
import { types } from "../types"

export const startLoadBrandsHome = () => {
    return async (dispatch) => {
        let url = '/brands/products/brand';

        try {
            const res = await client.get(url);
            dispatch(loadBrandsHome(res.data.brands));
        } catch (error) {
            console.log(error);
        }
    }
}

export const startLoadBrands = () => {
    return async (dispatch) => {
        let url = '/brands/products/brand';
        try {
            const res = await client.get(url);
            dispatch(loadBrands(res.data.brands))
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadBrandsHome = (brands) => ({
    type: types.loadBrandsHome,
    payload: brands
})

export const loadBrands = (brands) => ({
    type: types.loadBrands,
    payload: brands
});

export const startLoadProductsPerBrand = (brand) => {
    return async (dispatch) => {
        let url = `/products/brand/${brand}`;
        try {
            const res = await client.get(url);
            dispatch(loadProductsPerBrand(res.data.products))
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadProductsPerBrand = (products) => ({
    type: types.load_products_per_brand,
    payload: products
})

export const startLoadProductsPerBrandAndCategory = (brand_id, category_id) => {
    return async (dispatch) => {
        let url = `/products/brand/category/${brand_id}/${category_id}`;
        try {
            const res = await client.get(url);
            dispatch(startLoadBrandPerCategory);
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadProductsPerBrandAndCategory = (products) => ({
    type: types.load_products_per_brand_and_category,
    payload: products
})
