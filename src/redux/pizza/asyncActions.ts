import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { PizzaSlice } from "./types"

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

