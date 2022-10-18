import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },

    selectCategory: (state, action) => {
      state.categoryIdx = action.payload;
    },

    setSelectedType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

console.log(filterSlice);

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, selectCategory, setSelectedType } =
  filterSlice.actions;

export default filterSlice.reducer;
