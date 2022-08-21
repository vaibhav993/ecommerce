import { render, screen, fireEvent } from "@testing-library/react"
import { act } from "react-dom/test-utils";

import Filter from '@/components/products/filter'
import filterData from '../../../data/filterData'

jest.mock('next/router', () => require('next-router-mock'));

describe('Filter', () => {
  const createTestProps = (props={}) => ({
    filters: filterData,
    ...props
  })

  let props = createTestProps()
  it('renders Filter', () => {
    const { container } = render(<Filter {...props}/>)
    expect(container).toMatchSnapshot()
  })

  it('- should handle search by color', async () => {
    render(<Filter {...props}/>)
    const element = screen.getByTestId('filter-group-item-checkbox-Red')
    expect(element.checked).toEqual(false)
    await act(async () => {
      fireEvent.click(element)
    })
    expect(element.checked).toEqual(true)
    await act(async () => {
      fireEvent.click(element)
    })
    expect(element.checked).toEqual(false)
  })

  it('- should handle search by Gender', async () => {
    render(<Filter {...props}/>)
    const element = screen.getByTestId('filter-group-item-checkbox-Men')
    expect(element.checked).toEqual(false)
    await act(async () => {
      fireEvent.click(element)
    })
    expect(element.checked).toEqual(true)
  })

  it('- should handle search by Price', async () => {
    render(<Filter {...props}/>)
    const element = screen.getByTestId('filter-group-item-checkbox-0-Rs250')
    expect(element.checked).toEqual(false)
    await act(async () => {
      fireEvent.click(element)
    })
    expect(element.checked).toEqual(true)
  })

  it('- should handle search by Type', async () => {
    render(<Filter {...props}/>)
    const element = screen.getByTestId('filter-group-item-checkbox-Polo')
    expect(element.checked).toEqual(false)
    await act(async () => {
      fireEvent.click(element)
    })
    expect(element.checked).toEqual(true)
  })
})