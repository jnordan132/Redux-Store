import { useReducer } from 'react';
import * as  actions from './actions';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case actions.ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case actions.ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    case actions.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };
    case actions.REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case actions.CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case actions.TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case actions.UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case actions.UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}