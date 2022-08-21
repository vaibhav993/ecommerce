import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '../common/logo'
import classes from './navigation.module.css'
import useStore from '../../hooks/useStore'

const Navigation = memo(() => {
  const { cartItems } = useStore()
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <Logo/>
        </a>
      </Link>
      <Link href='/cart'>
        <a className={classes['cart-icon']}>
          {
            cartItems.length > 0 && (
              <span className={classes['cart-count']}>{cartItems.length}</span>
            )
          }
          <Image src={'/images/cart-icon.svg'} alt='cart-icon' width='35px' height='35px' />
        </a>
      </Link>
    </header>
  )
})

Navigation.displayName = 'Navigation'
export default Navigation