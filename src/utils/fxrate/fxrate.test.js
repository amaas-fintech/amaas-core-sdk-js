import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve('fxrate')
    )
  })
  test('with promise', () => {
    let promise = api.fxrate.retrieve({ AMId: 88 })
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.fxrate.retrieve(
      { AMId: 88, query : { 
        businessDateStart: '2016-01-01',
        businessDateEnd: '2017-12-31',
        assetIds: 'USDJPY'
      } },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'fxrate',
          AMId: 88,
          query: {
            businessDateStart: '2016-01-01',
            businessDateEnd: '2017-12-31',
            assetIds: 'USDJPY'
          }
        })
      }
    )
  })
})
