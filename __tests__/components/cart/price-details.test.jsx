import { render, screen } from "@testing-library/react"

import PriceDetails from '@/components/cart/price-details'

describe('PriceDetails', () => {

  const createTestProps = (props={}) => ({
    cartItems: [
      {
        id: 1,
        quantity: 2,
        itemData: {
          "id": 1,
          "name": "Green Polo",
          "price": 250,
          "currency": "INR",
          "quantity": 1
        }
      },
      {
        id: 1,
        quantity: 1,
        itemData: {
          "id": 1,
          "name": "Green Polo",
          "price": 250,
          "currency": "INR",
          "quantity": 1
        }
      },
    ],
    ...props
  })

  let props = createTestProps()
  
  it('renders PriceDetails', () => {
    const { container } = render(<PriceDetails {...props}/>)
    expect(container).toMatchSnapshot()
  })

  it('- should render correct data', () => {
    render(<PriceDetails {...props}/>)
    const totalMRP = screen.getByTestId('mrp-price')
    const totalAmount = screen.getByTestId('total-amount')
    expect(totalMRP).toHaveTextContent('₹750.00')
    expect(totalAmount).toHaveTextContent('₹750.00')
  })
})