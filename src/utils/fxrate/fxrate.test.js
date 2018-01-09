import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve('fxRate')
    )
  })
  test('with promise', () => {
    let promise = api.FXRate.retrieve({ AMId: 88, query: {
      businessDateStart: '2016-01-01',
      businessDateEnd: '2017-12-31',
      assetIds: 'USDJPY'
    }  })
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.FXRate.retrieve({
      AMId: 88,
      query: {
        businessDateStart: '2016-01-01',
        businessDateEnd: '2017-12-31',
        assetIds: 'USDJPY'
      }},
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'fxRate',
          AMId: 88,
          query: {
            businessDateStart: '2016-01-01',
            businessDateEnd: '2017-12-31',
            assetIds: 'USDJPY',
          }
        })
      }
    )
    done()
  })
})
