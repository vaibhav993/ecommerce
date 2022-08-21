import { render } from "@testing-library/react"
import ReactDOM from "react-dom";

import Home, { getServerSideProps } from '@/pages/index'

jest.mock('next/router', () => require('next-router-mock'));

describe('Home', () => {
  const createTestProps = (props={}) => ({
    products: [],
    filter: [],
    ...props
  })

  let props = createTestProps()

  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('renders Home', () => {
    const { container } = render(<Home {...props}/>)
    expect(container).toMatchSnapshot()
  })
})

describe('getServerSideProps', () => {
  const createTestProps = (props={}) => ({
    query: {},
    ...props
  })

  const mockProductdata = [
    {
      "id": 5,
      "imageURL": "test",
      "name": "Green Polo",
      "type": "Polo",
      "price": 250,
      "currency": "INR",
      "color": "Green",
      "gender": "Men",
      "quantity": 1
    }
  ]

  let props = createTestProps()

  beforeAll(() => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(mockProductdata)
      })
    );
  });

  it('- should call api', async () => {
    const response = await getServerSideProps(props)
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  it('- should handle search query', async () => {
    props = createTestProps({ query: { search: 'polo' }})
    const response = await getServerSideProps(props)
    expect(response).toBeDefined()
  })

  it('- should handle price filter query', async () => {
    props = createTestProps({ query: { price: '0-250' }})
    const response = await getServerSideProps(props)
    expect(response).toBeDefined()
  })

  it('- should handle multiple price filter query', async () => {
    props = createTestProps({ query: { price: '0-250,251-450' }})
    const response = await getServerSideProps(props)
    expect(response).toBeDefined()
  })

  it('- should handle price without upper limit filter query', async () => {
    props = createTestProps({ query: { price: '451' }})
    const response = await getServerSideProps(props)
    expect(response).toBeDefined()
  })

  it('- should handle color filter query', async () => {
    props = createTestProps({ query: { color: 'blue' }})
    const response = await getServerSideProps(props)
    expect(response).toBeDefined()
  })

  it('- should handle incorrect filter query', async () => {
    props = createTestProps({ query: { color2: 'blue' }})
    const response = await getServerSideProps(props)
    expect(response).toBeDefined()
  })
})