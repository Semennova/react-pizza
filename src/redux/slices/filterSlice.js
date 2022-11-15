import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchValue: '',
  categories: [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ],
  categoryIdx: 0,
  sortType: {
    name: "популярности",
    property: "rating",
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.categoryIdx = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    setSelectedType: (state, action) => {
      state.sortType = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setFilters: (state, action) => {
      state.sortType.property = action.payload.sortProperty;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryIdx = Number(action.payload.categoryIdx);
    },
  },
});

export const filterSelector = (state => state.filter)

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  selectCategory,
  setSelectedType,
  setCurrentPage,
  setFilters,
  setSearchValue
} = filterSlice.actions;

export default filterSlice.reducer;
