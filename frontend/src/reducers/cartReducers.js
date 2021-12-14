import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: [] },
  action
) => {
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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // Strip out the id of the item that we remove
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        // The data that is  passed in on the form as the payload
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
