import { memo } from 'react'
import { useRouter } from 'next/router'

import { removeProps, appendWithSemiColon, isHaveValue } from '../../../utils/helper'
import classes from './filter.module.css'

const Filter = memo(({ filters }) => {
  const router = useRouter()
  const { pathname, query } = router

  const searchByFilters = ({ 
    Color,
    Gender,
    Price,
    Type
  }) => {
    if (Color) query.Color = appendWithSemiColon(query.Color, Color);
    if (Gender) query.Gender = appendWithSemiColon(query.Gender, Gender);
    if (Price) query.Price = appendWithSemiColon(query.Price, Price);
    if (Type) query.Type = appendWithSemiColon(query.Type, Type);

    router.push({
      pathname,
      query: query,
    });
  }
  
  const onChange = (e, type, value) => {
    if (e.target.checked) {
      searchByFilters({ [type]: value })
    } else {
      let updatedQuery = removeProps(query, type, value)
      router.push({
        pathname,
        query: updatedQuery,
      });
    }
  }

  return (
    <section className={classes.filter}>
      {
        filters?.map(({ by, options }) => (
          <div data-testid='filter-group' key={by} className={classes['filter-item']}>
            <span>{by}</span>
            <ul>
            {
              options.map(option => {
                const label = option?.label || option
                const value = option?.value || option
                return (
                  <li data-testid='filter-group-item' key={label}>
                    <input
                      data-testid='filter-group-item-checkbox'
                      type='checkbox'
                      defaultChecked={isHaveValue(query[by], value)}
                      name={label}
                      onChange={e => onChange(e, by, value)}
                    />
                    <label>{label}</label>
                  </li>
                )
              })
            }
            </ul>
          </div>
        ))
      }
    </section>
  )
})

Filter.displayName = 'Filter'

export default Filter