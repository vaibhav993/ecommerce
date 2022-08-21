import { render, screen, fireEvent } from "@testing-library/react"
import { act } from "react-dom/test-utils";

import CartItem from '@/components/cart/cart-item'

describe('CartItem', () => {
  const increaseItemQuantity = jest.fn()
  const decreaseItemQuantity = jest.fn()
  const removeItem = jest.fn()
  const createTestProps = (props={}) => ({
    cartItemData: {
      id: 1,
      quantity: 1,
      itemData: {
        "id": 1,
        "imageURL": "/test",
        "name": "Green Polo",
        "type": "Polo",
        "price": 250,
        "currency": "INR",
        "color": "Green",
        "gender": "Men",
        "quantity": 1
      }
    },
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
    ...props
  })

  let props = createTestProps()
  
  it('renders CartItem', () => {
    const { container } = render(<CartItem {...props}/>)
    expect(container).toMatchSnapshot()
  })

  it('- should render correct data', () => {
    render(<CartItem {...props}/>)
    const itemName = screen.getByTestId('cart-item-name')
    const itemPrice = screen.getByTestId('cart-item-price')
    expect(itemName).toHaveTextContent('Green Polo')
    expect(itemPrice).toHaveTextContent('₹250.00')
  })

  it('- should handle actions', async () => {
    render(<CartItem {...props}/>)
    const addButton = screen.getByTestId('decrease-item-qunatity')
    const minusButton = screen.getByTestId('increase-item-qunatity')
    const removeButton = screen.getByTestId('remove-cart-item')
    
    await act(async () => {
      fireEvent.click(addButton)
      fireEvent.click(minusButton)
      fireEvent.click(removeButton)
    })
    expect(increaseItemQuantity).toBeCalledTimes(1)
    expect(decreaseItemQuantity).toBeCalledTimes(1)
    expect(removeItem).toBeCalledTimes(1)
  })
})