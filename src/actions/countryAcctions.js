import client from '../config/axiosConfig';
import { types } from '../types';

export const startLoadCountries = () => {
    return async (dispatch) => {
        try {
            let url = 'countries';
            const { data } = await client.get(url);
            dispatch(loadCountries(data.countries));
        } catch (error) {
            console.log(error);
        }
    };
};

const loadCountries = (countries) => ({
    type: types.load_countries,
    payload: countries,
});

export const selectedCountry = (country) => ({
    type: types.country_selected,
    payload: country
});

export const clearCountrySelected = () => ({
    type: types.clear_country_selected,
});


export const startLoadCurrencies = () => {
    return async (dispatch) => {
        try {
            let url = 'currencies';
            const { data } = await client.get(url);
            dispatch(loadCurrencies(data.currencies));
        } catch (error) {
            console.log(error);
        }
    };
};

const loadCurrencies = (currencies) => ({
    type: types.load_currencies,
    payload: currencies,
});

