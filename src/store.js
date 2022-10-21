import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerUserReducer, loginReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  registerUserReducer,
  loginReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
