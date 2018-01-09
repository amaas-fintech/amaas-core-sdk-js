import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve('eod')
    )
  })
  test('with promise', () => {
    let promise = api.EOD.retrieve({ AMId: 88 })
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.EOD.retrieve(
      { AMId: 88, query: {
        businessDateStart: '2017-11-27',
        businessDateEnd: '2017-12-31',
        assetIds: '358.HK'
      } },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'eod',
          AMId: 88,
          query: {
            businessDateStart: '2017-11-27',
            businessDateEnd: '2017-12-31',
            assetIds: '358.HK'
          }
        })
        done()
      }
    )
  })
})
