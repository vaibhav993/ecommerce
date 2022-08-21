import { memo } from 'react'

import Navigation from '../navigation'
import classes from './layout.module.css'

const Layout = memo(({ children }) => {
  return (
    <>
      <Navigation />
      <main className={classes['main-container']}>
        {children}
      </main>
    </>
  )
})

Layout.displayName = 'Layout'

export default Layout