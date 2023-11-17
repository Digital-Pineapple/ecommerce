import { types } from "../types";

const initialState = {
  logo: "",
  top_text: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  aboutUs: {},
  mission: {},
  countryPermissions: [],
  country: {},
  acceptCookiesPoliticy: false,
  policie: {},
  slider: [],
};

export const administrableReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.loadAdministrableLogo:
      return {
        ...state,
        logo: payload.logo,
        top_text: payload.top_text,
        facebook: payload.facebook,
        instagram: payload.instagram,
        tiktok: payload.tiktok,
      };
    case types.loadAdministrableSlider:
      return {
        ...state,
        sliders: payload,
      };

    case types.loadAdministrableAbout:
      return {
        ...state,
        aboutUs: payload.about.aboutThat,
        mission: payload.about.mission,
      };

    case types.accept_cookies_politicy:
      return {
        ...state,
        acceptCookiesPoliticy: true,
      };

    case types.load_country_permissions:
      return {
        ...state,
        countryPermissions: payload,
      };

    case types.load_one_country_permissions:
      return {
        ...state,
        country: payload,
      };

    case types.load_policies:
      return {
        ...state,
        policie: payload,
      };

    default:
      return state;
  }
};
