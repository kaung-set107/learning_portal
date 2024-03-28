import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./features/getId";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
