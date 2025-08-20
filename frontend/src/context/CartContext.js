import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_DISCOUNT: 'SET_DISCOUNT'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, size, color, quantity } = action.payload;
      const itemKey = `${product.id}-${size}-${color}`;
      
      const existingItem = state.items.find(item => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id && 
            item.size === size && 
            item.color === color
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (product.price * quantity)
        };
      } else {
        const newItem = {
          id: itemKey,
          product,
          size,
          color,
          quantity,
          price: product.price
        };
        
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + (product.price * quantity)
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const item = state.items.find(item => item.id === action.payload.itemId);
      if (!item) return state;

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId),
        totalItems: state.totalItems - item.quantity,
        totalPrice: state.totalPrice - (item.price * item.quantity)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (!item || quantity <= 0) return state;

      const quantityDiff = quantity - item.quantity;

      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId
            ? { ...item, quantity }
            : item
        ),
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.price * quantityDiff)
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };

    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    case CART_ACTIONS.SET_DISCOUNT:
      return {
        ...state,
        discount: action.payload,
      };

    default:
      return state;
  }
};

// Initial cart state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  discount: 0
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dwapor-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dwapor-cart', JSON.stringify(cartState));
  }, [cartState]);

  const addToCart = (product, size, color, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, size, color, quantity }
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId }
    });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const applyCoupon = (couponCode, cartTotal) => {
    let discountAmount = 0;
    let message = { type: 'error', text: 'Invalid coupon code or cart amount.' };

    if (couponCode === 'YAYY250') {
      if (cartTotal >= 2500) {
        discountAmount = 250;
        message = { type: 'success', text: 'YAYY250 applied! You got ₹250 off.' };
      } else {
        message = { type: 'error', text: 'Cart amount must be ₹2500 or more for YAYY250.' };
      }
    } else if (couponCode === 'YAYY500') {
      if (cartTotal >= 5000) {
        discountAmount = 500;
        message = { type: 'success', text: 'YAYY500 applied! You got ₹500 off.' };
      } else {
        message = { type: 'error', text: 'Cart amount must be ₹5000 or more for YAYY500.' };
      }
    } else {
      message = { type: 'error', text: 'Invalid coupon code.' };
    }

    dispatch({ type: CART_ACTIONS.SET_DISCOUNT, payload: discountAmount });
    return message;
  };

  const getCartTotal = () => {
    return Math.max(0, cartState.totalPrice - cartState.discount);
  };

  const getCartItemsCount = () => {
    return cartState.totalItems;
  };

  const value = {
    cart: cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    applyCoupon,
    discount: cartState.discount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};