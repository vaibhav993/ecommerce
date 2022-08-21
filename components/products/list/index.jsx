import { memo, useCallback } from 'react'

import useStore from '../../../hooks/useStore'
import Modal from '../../common/modal'
import Search from '../search'
import ProductsListItem from './list-item'
import classes from './list.module.css'

const ProductsList = memo(({ products }) => {
  const { errorMessage, addToCart, resetErrorMessage } = useStore()

  return (
    <section className={classes['product-list-section']}>
      <Search />
      <div className={classes['product-list']}>
        {
          products.map((product) => (
            <ProductsListItem
              key={product?.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        }
      </div>
      <Modal show={!!errorMessage} onClose={resetErrorMessage} title="Oh no!">
        <h4>{errorMessage}</h4>
      </Modal>
    </section>
  )
})

ProductsList.displayName = 'ProductsList'

export default ProductsList