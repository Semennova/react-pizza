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