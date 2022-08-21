import { memo } from 'react'
import Image from 'next/image'

import { priceFormatter } from '../../../utils/helper'
import classes from './list-item.module.css'

const ProductsListItem = memo(({ product, onAddToCart }) => {

  const onClick = () => {
    onAddToCart(product)
  }

  return (
    <div className={classes['product-item']}>
      <div className={classes.hero}>
        <h3>{product?.name}</h3>
        <Image src={product?.imageURL} alt='product' width='200px' height='150px'/>
      </div>
      <div className={classes.description}>
        <h4>{priceFormatter(product?.price)}</h4>
        <button onClick={onClick}>Add to cart</button>
      </div>
    </div>
  )
})

ProductsListItem.displayName = 'ProductsListItem'

export default ProductsListItem