import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async params => {
    const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get(
      `https://6332bc21573c03ab0b4f552f.mockapi.io/items?${category}&sortBy=${sortBy}${search}&order=${order}&page=${currentPage}&limit=8`
    )
    return data
  }
)

const initialState = {
  items: [],
  status: 'loading'
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
      state.items = []
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload
        state.status = 'success'
    },
    [fetchPizzas.rejected]: (state) => {
        state.status = 'error'
        state.items = []
      },
  }
})

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
