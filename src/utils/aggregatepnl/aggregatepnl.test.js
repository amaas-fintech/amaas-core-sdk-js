import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve('aggregatePnl')
    )
  })
  test('with promise', () => {
    let promise = api.AggregatePNL.retrieve({ AMId: 88 })
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.AggregatePNL.retrieve(
      { AMId: 88, query: { key: 'value' } },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'aggregatepnl',
          AMId: 88,
          query: { key: 'value' }
        })
        done()
      }
    )
  })
})
