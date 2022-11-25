import { createSlice } from '@reduxjs/toolkit'
import { fetchPizzas } from './asyncActions'
import { IPizzaSliceState, Status } from './types'


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

// export const pizzasSelector = (state: RootState) => state.pizzas

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
