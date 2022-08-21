import { render } from "@testing-library/react"

import App from '@/pages/_app'

describe('App', () => {
  const createTestProps = (props={}) => ({
    Component: 'div',
    pageProps: {},
    ...props
  })

  let props = createTestProps()
  it('renders App', () => {
    const { container } = render(<App {...props}/>)
    expect(container).toMatchSnapshot()
  })
})