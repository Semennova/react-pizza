export interface ICartState {
    totalPrice: number,
    items: CartItemType[],
  }
  export type CartItemType = {
    id: string 
    name: string 
    price: number 
    count: number 
    imageUrl: string 
    type: string 
    size: number
  }