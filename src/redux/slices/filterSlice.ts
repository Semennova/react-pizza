import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SortType_ = {
  name: string
  property: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title'
}

export interface IFilterState {
  searchValue: string
  categories: string[]
  categoryIdx: number
  sortType: SortType_
  currentPage: number
}

const initialState: IFilterState = {
  searchValue: '',
  categories: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
  categoryIdx: 0,
  sortType: {
    name: 'популярности',
    property: 'rating'
  },
  currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<number>) => {
      state.categoryIdx = action.payload
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },

    setSelectedType: (state, action: PayloadAction<SortType_>) => {
      state.sortType = action.payload
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    //: PayloadAction<IFilterState>
    setFilters: (state, action) => {
      if (Object.keys(action.payload).length) {
        state.sortType = action.payload.sortType
        state.currentPage = Number(action.payload.currentPage)
        state.categoryIdx = Number(action.payload.categoryIdx)
      } else {
        state.sortType = {
          name: 'популярности',
          property: 'rating'
        }
        state.currentPage = 1
        state.categoryIdx = 0
      }
    }
  }
})

export const filterSelector = (state: RootState) => state.filter

// Action creators are generated for each case reducer function
export const { selectCategory, setSelectedType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
