import { types } from "../types";

const initialState = {
  user: null,
  directions: [],
  direction: [],
  states: [],
  municipalities: [],
  fiscalAddress: {},
  stateSelected: {},
  municipalitySelected: {},
  taxes: [],
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.load_data_user:
      return {
        ...state,
        user: payload,
      };

    case types.load_directions:
      return {
        ...state,
        directions: payload,
      };

    case types.add_new_address:
      return {
        ...state,
        directions: [...state.directions, payload],
      };

    case types.change_default_addres:
      return {
        ...state,
        directions: state.directions.map((direction) =>
          direction._id === payload
            ? { ...direction, default: (direction.default = true) }
            : { ...direction, default: (direction.default = false) }
        ),
      };

    case types.select_one_direction:
      return {
        ...state,
        direction: payload,
      };

    case types.update_direction_user:
      return {
        ...state,
        directions: payload,
      };

    case types.clear_direction:
      return {
        ...state,
        direction: "",
      };

    case types.delete_addres:
      return {
        ...state,
        directions: state.directions.filter(
          (direction) => direction._id !== payload
        ),
      };

    case types.update_data_user:
      return {
        ...state,
        user: {
          ...state.user,
          fullname: (state.user.fullname = payload.fullname),
          email: (state.user.email = payload.email),
          phone: (state.user.phone = payload.phone),
        },
      };

    case types.update_image_user:
      return {
        ...state,
        user: {
          ...state.user,
          profileImage: (state.user.profileImage = payload),
        },
      };
    case types.load_states:
      return {
        ...state,
        states: payload,
      };
    case types.load_municipalities:
      return {
        ...state,
        municipalities: payload,
      };
    case types.load_fiscal_address: {
      const { customer, state: states, municipality } = payload;
      return {
        ...state,
        fiscalAddress: customer,
        // stateSelected: states,
        // municipalitySelected: municipality,
      };
    }
    case types.save_fiscal_address: {
      const { customer, state: states, municipality } = payload;
      return {
        ...state,
        fiscalAddress: customer,
        stateSelected: states,
        municipalitySelected: municipality,
      };
    }

    case types.update_fiscal_address:
      const { customer, state: states, municipality } = payload;
      return {
        ...state,
        fiscalAddress: customer,
        stateSelected: states,
        municipalitySelected: municipality,
      };

    case types.laod_tax_system:
      return {
        ...state,
        taxes: payload,
      };

    default:
      return state;
  }
};
