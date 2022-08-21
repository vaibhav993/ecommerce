import { memo } from 'react'

import Filter from '../components/products/filter'
import ProductsList from '../components/products/list'
import filterdata from '../data/filterData'
import { isHaveValue } from '../utils/helper'
import classes from './index.module.css'

const Home = memo(({ products, filters }) => {
  return (
    <div className={classes['home-container']}>
      <Filter filters={filters}/>
      <ProductsList products={products} />
    </div>
  )
})

export async function getServerSideProps({ query }) {
  const res = await fetch(`https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`)
  const products = await res.json()

  const filteredProducts = products.filter((product) => Object.keys(query)
    .every(q => {
      const filterQuery = q.toLowerCase()

      if (filterQuery === 'search') {
        const productData = `${product.name},${product.color},${product.type}`.toLowerCase()
        const queryValue = query[q].toLowerCase()
        return queryValue.split(' ').some(q => isHaveValue(productData, q))
      }

      // To handle queries other than product properties
      if(!product.hasOwnProperty(filterQuery)) {
        return true
      }

      if (filterQuery === 'price') {
        const price = product[filterQuery]
        const queryValue = query[q]
        const { lowerLimit, higherLimit} = queryValue
          .split(",")
          .reduce((acc, val) => {
            const lowerVal = Number(val.split('-')[0])
            const higherVal = Number(val.split('-')[1])

            return {
              ...acc,
              lowerLimit: acc.lowerLimit 
                ? Math.min(acc.lowerLimit, lowerVal)
                : lowerVal,
              higherLimit: acc.higherLimit
                ? Math.max(acc.higherLimit, higherVal)
                : higherVal
            }
          },{ 
            lowerLimit: null, higherLimit: null 
          })

        return higherLimit
          ? lowerLimit <= price && higherLimit >= price
          : lowerLimit <= price
      } else  {
        return isHaveValue(query[q], product[filterQuery])
      }
    })
  )

  return { 
    props: { 
      products: filteredProducts,
      filters: filterdata
    } 
  }
}

Home.displayName = 'Home'

export default Home