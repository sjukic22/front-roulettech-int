import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccessState {
  refresh: string | null;
  access: string | null;
}

const initialState: AccessState = {
  refresh: null,
  access: null,
};

export const accessChange = createSlice({
  name: "access",
  initialState,
  reducers: {
    setAccess: (state, action: PayloadAction<AccessState>) => {
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
    },
    clearAccess: (state, action) =>{
      state.refresh = initialState.refresh;
      state.access = initialState.access;
    },
  },
});

export const { setAccess,clearAccess } = accessChange.actions;

export default accessChange.reducer;
