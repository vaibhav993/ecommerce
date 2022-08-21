import { memo } from 'react'
import Image from 'next/image'

import classes from './cart-item.module.css'
import { priceFormatter } from '../../../utils/helper'

const CartItem = memo(({
  cartItemData,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem
}) => {
  const { quantity, itemData } = cartItemData

  const onQuantityIncrease = () => {
    increaseItemQuantity(cartItemData)
  }

  const onQuantityDecrease = () => {
    decreaseItemQuantity(cartItemData)
  }

  const onItemRemove = () => {
    removeItem(cartItemData)
  }

  return (
    <div className={classes['cart-item']}>
      <div className={classes.group1}>
        <div className={classes.hero}>
          <Image src={itemData?.imageURL} alt='product' width='100px' height='90px'/>
        </div>
        <div className={classes.description}>
          <h4 data-testid='cart-item-name'>{itemData?.name}</h4>
          <h5 data-testid='cart-item-price'>{priceFormatter(itemData?.price)}</h5>
        </div>
      </div>
      <div className={classes.actions}>
        <div className={classes.quantity}>
          <button data-testid='decrease-item-qunatity' onClick={onQuantityDecrease}>-</button>
          <span>{quantity}</span>
          <button data-testid='increase-item-qunatity' onClick={onQuantityIncrease}>+</button>
        </div>
        <button data-testid='remove-cart-item' onClick={onItemRemove}>Delete</button>
      </div>
    </div>
  )
})

CartItem.displayName = 'CartItem'

export default CartItem