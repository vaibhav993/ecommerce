import { memo, useState } from 'react'

const Input = memo(({ name, type, defaultValue, onChange }) => {
  const [ state, setState ] = useState(defaultValue)

  const onChangeHandler = (e) => {
    const value = type === 'checkbox'
      ? e.target.checked
      : e.target.value

    setState(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <input
      name={name}
      type={type}
      data-testid={`${name}-${type}`}
      value={state}
      onChange={onChangeHandler}
    />
  )
})

Input.displayName = 'Input'
export default Input