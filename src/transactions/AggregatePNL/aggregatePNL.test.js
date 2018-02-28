import Decimal from 'decimal.js'

import AggregatePNL from './aggregatePNL'

describe('AggregatePNL', () => {
  it('constructs', () => {
    const params = {
      YTD: { pnl: { total: 2, asset: 0, fx: 2 } },
      MTD: { errorMessage: 'Error', pnl: { total: '0', asset: '0', fx: '0' } },
      fxRates: { HKDUSD: '1.23' }
    }
    const expectedParams = {
      YTD: {
        errorMessage: undefined,
        pnl: {
          total: new Decimal(2),
          asset: new Decimal(0),
          fx: new Decimal(2)
        }
      },
      MTD: {
        errorMessage: 'Error',
        pnl: {
          total: new Decimal('0'),
          asset: new Decimal('0'),
          fx: new Decimal('0')
        }
      },
      DTD: {
        errorMessage: undefined,
        pnl: {
          total: new Decimal('0'),
          asset: new Decimal('0'),
          fx: new Decimal('0')
        }
      },
      fxRates: {
        HKDUSD: new Decimal('1.23')
      }
    }
    const aggPNL = new AggregatePNL(params)
    expect({ ...aggPNL }).toEqual(expect.objectContaining(expectedParams))
  })
})
