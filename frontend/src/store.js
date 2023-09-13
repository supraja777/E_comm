import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer
} from "./reducers/productReducer";
import {
  profileReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer
});

let intialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo: localStorage.getItem("shippingInfo") 
      ? JSON.parse(localStorage.getItem("shippingInfo")) 
      : {},
  },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
