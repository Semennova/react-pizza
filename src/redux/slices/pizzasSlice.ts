import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

interface IPizzaSliceState {
  items: PizzaSlice[]
  status: 'loading' | 'success' | 'error'
}

type PizzaSlice = {
  id: string
  name: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export const fetchPizzas = createAsyncThunk<PizzaSlice[], Record<string, string>>(
  'pizzas/fetchPizzasStatus',
  async params => {
    const { category, sortBy, order, search, currentPage } = params
    const { data } = await axios.get<PizzaSlice[]>(
      `https://6332bc21573c03ab0b4f552f.mockapi.io/items?${category}&sortBy=${sortBy}${search}&order=${order}&page=${currentPage}&limit=8`
    )
    return data
  }
)

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING
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

  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.items = action.payload
    })

    builder.addCase(fetchPizzas.rejected, state => {
      state.status = Status.ERROR
      state.items = []
    })
  }

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading'
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //       state.items = action.payload
  //       state.status = 'success'
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //       state.status = 'error'
  //       state.items = []
  //     },
  // }
})

export const pizzasSelector = (state: RootState) => state.pizzas

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
