import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./reducer";

const store = configureStore({
  reducer: postReducer,
});

export default store;