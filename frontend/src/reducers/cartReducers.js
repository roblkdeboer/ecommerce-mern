import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // For each of the items in the current cart state where the product ID is equal to the current item in the state then true
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // If it does exist, take the current cart items and if they equal the existing cart items then return the item, if not, return the new item x
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // If it doesn't exist, take the current state and add the new item
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};
