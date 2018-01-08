import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve('forwardrate')
    )
  })
  test('with promise', () => {
    let promise = api.ForwardRate.retrieve({ AMId: 88 })
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.ForwardRate.retrieve(
      { AMId: 88, assetIds: '358.HK', query: {
        businessDateStart: '2017-11-27',
        businessDateEnd: '2017-12-31',
        tenor: 'ON'
      } },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'forwardrate',
          assetIds: '358.HK',
          AMId: 88,
          query: {
            businessDateStart: '2017-11-27',
            businessDateEnd: '2017-12-31',
            tenor: 'ON'
          }
        })
        done()
      }
    )
  })
})
