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
  categoryIdx: 0
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
        console.log(action);
        state.categoryIdx = action.payload
    },
  },
});

console.log(filterSlice);

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, selectCategory } = filterSlice.actions;

export default filterSlice.reducer;
