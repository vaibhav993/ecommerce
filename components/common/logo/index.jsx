import { memo } from 'react'

import classes from './logo.module.css'

const Logo = memo(() => (
  <div className={classes.logo}>
    TeeTex Store
  </div>
))

Logo.displayName = 'Logo'
export default Logo