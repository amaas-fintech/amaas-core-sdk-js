import Decimal from 'decimal.js'

import * as api from '../../exports/api'
import * as network from '../network'
import AggregatePNL from '../../transactions/AggregatePNL/aggregatePNL'

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
  it('returns a class', done => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve({
        fxRates: { HKDUSD: '1.23' },
        aggregatePnl: {
          DTD: {
            total: 8,
            asset: 3,
            fx: 5
          }
        }
      })
    )
    api.AggregatePNL.retrieve(
      { AMId: 8, quuery: { key: 'value' } },
      (error, result) => {
        expect(result).toBeInstanceOf(AggregatePNL)
        expect(result.fxRates.HKDUSD).toEqual(new Decimal('1.23'))
        expect(result.DTD.total).toEqual(new Decimal(8))
        done()
      }
    )
  })
})
