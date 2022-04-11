import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer, productsReducer, categoryReducer, shoppingCartReducer, offersReducer, tagsReducer, brandsReducer  , newsletterReducer , sliderReducer , administrableReducer, profileReducer , wishListReducer, checkoutReducer} from "../reducers";
const reducers = combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoryReducer,
  cart: shoppingCartReducer,
  checkout:checkoutReducer,
  offers: offersReducer,
  tags: tagsReducer,
  sliders: sliderReducer,
  brands: brandsReducer,
  newsletter: newsletterReducer,
  administrable: administrableReducer,
  profile: profileReducer,
  wishList: wishListReducer
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    return nextState;
  } else {
    return reducers(state, action);
  }
}

const middleware = [thunk]
const makeStore = () => createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore);

