import { memo, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { sanitizeHTML } from '../../../utils/helper'
import classes from './search.module.css'

const Search = memo(() => {
  const searchRef = useRef(null);
  const router = useRouter()
  const { pathname, query } = router

  const onSubmit = (event)  => {
    event.preventDefault();
    if (searchRef?.current?.value) {
      query.search = sanitizeHTML(searchRef?.current?.value)
      router.push({
        pathname,
        query
      });
      // event.target.reset();
    }
  }

  return (
    <form data-testid='search-products' className={classes.form} onSubmit={onSubmit}>
      <input
        ref={searchRef}
        name='search'
        placeholder='Search for products...'
      />
      <button type='submit'>
        <Image src={'/images/search-icon.svg'} alt='search' width='16px' height='16px' />
      </button>
    </form>
  )
})

Search.displayName = 'Search'

export default Search