import * as utils from './utils'

describe('buildURL', () => {
  it('builds', () => {
    const expectedResult = `${utils.getEndpoint({})}book/books/1`
    const result = utils.buildURL({AMId: 1, AMaaSClass: 'book'})
    expect(result).toBe(expectedResult)
  })
  it('throws for invalid class', () => {
    const willThrow = () => {
      utils.buildURL({AMaaSClass: undefined})
    }
    expect(willThrow).toThrow()
  })
})