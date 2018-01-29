import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve('forwardRate')
    )
  })
  test('with promise', () => {
    let promise = api.ForwardRate.retrieve({ 
      AMId: 88,
      assetIds: '358.HK',
      query: {
        businessDateStart: '2017-11-27',
        businessDateEnd: '2017-12-31',
        tenor: 'ON'
      }
    })
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.ForwardRate.retrieve(
      {
        AMId: 88,
        assetIds: '358.HK',
        query: {
          businessDateStart: '2017-11-27',
          businessDateEnd: '2017-12-31',
          tenor: 'ON'
        }
      },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMId: 88,
          AMaaSClass: "forwardRate",
          query: {
            businessDateEnd: "2017-12-31",
            businessDateStart: "2017-11-27",
            tenor: "ON"
          },
          resourceId: "358.HK"
        })
        done()
      }
    )
  })
})
