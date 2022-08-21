import { memo } from 'react'

import CartItems from '../../components/cart'

const Cart = memo(() => {
  return (
    <>
      <CartItems />
    </>
  )
})

Cart.displayName = 'Cart'

export default Cart