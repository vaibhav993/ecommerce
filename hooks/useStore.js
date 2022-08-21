import { 
  createContext, useCallback, useContext, useReducer
} from 'react';

export const StoreContext = createContext({});

const initialState = {
  isLoading: false,
  cartItems: [],
  errorMessage: null
}

export const actions = {
  SET_LOADING: 'SET_LOADING',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREMENT_ITEM_QUANTITY: 'INCREMENT_ITEM_QUANTITY',
  DECREMENT_ITEM_QUANTITY: 'DECREMENT_ITEM_QUANTITY',
  SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
  RESET_ERROR_MESSAGE: 'RESET_ERROR_MESSAGE'
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case actions.ADD_TO_CART: {
      let newItem = action.payload;
      newItem = {
        id: newItem.id,
        quantity: 1,
        itemData: newItem
      }
      const alreadyAddedItem = state.cartItems.find(i => i.id === newItem.id)
      const quantity = alreadyAddedItem ? alreadyAddedItem.quantity + 1 : 1;
      if (newItem.itemData.quantity >= quantity) {
        const cartItems = alreadyAddedItem
          ? state.cartItems.map((item) =>
              item.id === alreadyAddedItem.id ? { ...newItem, quantity } : item
            )
          : [...state.cartItems, newItem];
        return {
          ...state,
          isLoading: false,
          cartItems
        }
      } else {
        return {
          ...state,
          isLoading: false,
          errorMessage: 'Sorry, it looks like this product is out of stock'
        }
      }
    }
    case actions.INCREMENT_ITEM_QUANTITY: {
      let item = action.payload;
      const alreadyAddedItem = state.cartItems.find(i => i.id === item.id)
      if (item.itemData.quantity > alreadyAddedItem.quantity) {
        const quantity = alreadyAddedItem.quantity + 1;
        const cartItems = state.cartItems.map((o) =>
          o.id === alreadyAddedItem.id ? { ...alreadyAddedItem, quantity } : o
        )
        return {
          ...state,
          isLoading: false,
          cartItems
        }
      }

      return {
        ...state,
        isLoading: false,
        errorMessage: 'Sorry, it looks like this product is out of stock'
      }
    }
    case actions.DECREMENT_ITEM_QUANTITY: {
      let item = action.payload;
      const alreadyAddedItem = state.cartItems.find(i => i.id === item.id)
      const quantity = alreadyAddedItem.quantity > 1
        ? alreadyAddedItem.quantity - 1
        : alreadyAddedItem.quantity;
      const cartItems = state.cartItems.map((item) =>
        item.id === alreadyAddedItem.id ? { ...alreadyAddedItem, quantity } : item
      )
      return {
        ...state,
        isLoading: false,
        cartItems
      }
    }
    case actions.REMOVE_ITEM:
      return {
        ...state,
        isLoading: false,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      }
    case actions.SET_ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage
      }
    case actions.RESET_ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: null
      }
    default:
      return state;
  }
}

export const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart =  useCallback((item) => {
    dispatch({
      type: actions.ADD_TO_CART,
      payload: item
    })
  }, [dispatch])

  const increaseItemQuantity =  useCallback((item) => {
    dispatch({
      type: actions.INCREMENT_ITEM_QUANTITY,
      payload: item
    })
  }, [dispatch])

  const decreaseItemQuantity =  useCallback((item) => {
    dispatch({
      type: actions.DECREMENT_ITEM_QUANTITY,
      payload: item
    })
  }, [dispatch])

  const removeItem =  useCallback((item) => {
    dispatch({
      type: actions.REMOVE_ITEM,
      payload: item
    })
  }, [dispatch])

  // const setErrorMessage = useCallback((errorMessage) => {
  //   dispatch({
  //     type: actions.SET_ERROR_MESSAGE,
  //     errorMessage
  //   })
  // }, [dispatch])

  const resetErrorMessage = useCallback(() => {
    dispatch({
      type: actions.RESET_ERROR_MESSAGE,
    })
  }, [dispatch])

  return (
    <StoreContext.Provider value={{
      cartItems: state.cartItems,
      errorMessage: state.errorMessage,
      addToCart,
      increaseItemQuantity,
      decreaseItemQuantity,
      removeItem,
      resetErrorMessage
    }}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => useContext(StoreContext);

export default useStore;