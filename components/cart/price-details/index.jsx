import { memo } from 'react'

import { priceFormatter } from '../../../utils/helper'
import classes from './price-details.module.css'

const PriceDetails = memo(({ cartItems }) => {
  const discount = 0
  const totalMRP = cartItems.reduce((acc, item) => (
    acc + (item.quantity * item.itemData.price)
  ), 0)
  const totalAmount = totalMRP - discount

  return (
    <div className={classes['price-details']}>
      <h4 data-testid='price-details-title'>{`Price Details (${cartItems.length} items)`}</h4>
      <div className={classes['base-row']}>
        <span>Total MRP</span>
        <span data-testid='mrp-price'>{priceFormatter(totalMRP)}</span>
      </div>
      <div className={classes['base-row']}>
        <span>Discount</span>
        <span data-testid='discount'>{`-${priceFormatter(discount)}`}</span>
      </div>
      <div className={classes['base-row']}>
        <span>Delivery Charges</span>
        <span data-testid='delivery-charges'>{'FREE'}</span>
      </div>
      <div className={classes['base-total']}>
        <span>Total Amount</span>
        <span data-testid='total-amount'>{priceFormatter(totalAmount)}</span>
      </div>
    </div>
  )
})

PriceDetails.displayName = 'PriceDetails'

export default PriceDetails