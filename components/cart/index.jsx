import { memo } from 'react'

import useStore from '../../hooks/useStore'
import CartItem from './cart-item'
import PriceDetails from './price-details'
import Modal from '../common/modal'
import classes from './cart-list.module.css'

const CartItems = memo(() => {
  const {
    errorMessage,
    cartItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
    resetErrorMessage
  } = useStore()

  return (
    <section className={classes['cart-list-section']}>
      {
        cartItems.length ? (
          <>
            {
              cartItems.map((cartItemData) => (
                <CartItem
                  key={cartItemData?.id}
                  cartItemData={cartItemData}
                  increaseItemQuantity={increaseItemQuantity}
                  decreaseItemQuantity={decreaseItemQuantity}
                  removeItem={removeItem}
                />
              ))
            }
            <PriceDetails cartItems={cartItems}/>
          </>
        ) : (
          <div className={classes['cart-empty']}>
            <h2>Your cart is empty!</h2>
          </div>
        )
      }
      <Modal show={!!errorMessage} onClose={resetErrorMessage} title="Oh no!">
        <h4>{errorMessage}</h4>
      </Modal>
    </section>
  )
})

CartItems.displayName = 'CartItems'

export default CartItems