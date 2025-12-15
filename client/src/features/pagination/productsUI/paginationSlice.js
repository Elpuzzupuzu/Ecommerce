// features/pagination/paginationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 14,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
      state.page = 1; // 🔑 cambiar tamaño resetea página
    },
    resetPagination() {
      return initialState;
    },
  },
});

export const {
  setPage,
  setLimit,
  resetPagination,
} = paginationSlice.actions;

export default paginationSlice.reducer;
