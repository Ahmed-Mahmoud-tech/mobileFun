import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  menuStatus: true,
}

export const mainConfigSlice = createSlice({
  name: "mainConfig",
  initialState,
  reducers: {
    ChangeMenuStatus: (state, action) => {
      state.menuStatus = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { ChangeMenuStatus } = mainConfigSlice.actions

export default mainConfigSlice.reducer
