import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./UsersSlice";
import loadersReducer from "./loaderSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    loaders: loadersReducer,
  },
});

export default store;
