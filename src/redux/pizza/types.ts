export interface IPizzaSliceState {
    items: PizzaSlice[]
    status: 'loading' | 'success' | 'error'
  }
  
export type PizzaSlice = {
    id: string
    name: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
  }
  
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
  }