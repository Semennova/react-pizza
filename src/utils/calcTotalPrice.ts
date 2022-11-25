import { CartItemType } from "../redux/cart/types";


export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum, obj) => {
        return sum + (obj.price * obj.count);
      }, 0);
}