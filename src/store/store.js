import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import appReducer from "../reducer/reducer";

const store = configureStore({
  reducer: appReducer,
  ...appReducer,
  middleware: [thunk,logger],  
});
  
  
export default store;

      