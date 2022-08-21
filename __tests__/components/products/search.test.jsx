import { render, screen, fireEvent } from "@testing-library/react"
import { act } from "react-dom/test-utils";

import Search from '@/components/products/search'

describe('Search', () => {
  const createTestProps = (props={}) => ({
    ...props
  })

  let props = createTestProps()
  let expectedRouterPush = null
  beforeEach(() => {
    expectedRouterPush = jest.fn()
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      pathname: '/',
      query: {},
      push: expectedRouterPush
    }));
  })
  
  it('renders Search', () => {
    const { container } = render(<Search {...props}/>)
    expect(container).toMatchSnapshot()
  })

  it('- should handle search by query', async () => {
    render(<Search {...props}/>)
    const element = screen.getByTestId('search')
    const formEle = screen.getByTestId('search-products')
    
    await act(async () => {
      fireEvent.change(element, { target: { value: 'polo' }})
      fireEvent.submit(formEle)
    })
    expect(expectedRouterPush).toBeCalledTimes(1)
    expect(expectedRouterPush).toBeCalledWith({"pathname": "/", "query": {"search": "polo"}})
  })
})