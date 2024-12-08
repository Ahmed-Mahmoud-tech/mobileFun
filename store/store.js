import { configureStore } from "@reduxjs/toolkit"
import mainConfigReducer from "./slices/mainConfig"

export const store = configureStore({
  reducer: {
    mainConfig: mainConfigReducer,
  },
})
