import Decimal from 'decimal.js'

import AggregatePNL from './aggregatePNL'

describe('AggregatePNL', () => {
  it('constructs', () => {
    const params = {
      YTD: { total: 2, asset: 0, fx: 2 },
      MTD: { total: '0', asset: '0', fx: '0' }
    }
    const expectedParams = {
      YTD: {
        total: new Decimal(2),
        asset: new Decimal(0),
        fx: new Decimal(2)
      },
      MTD: {
        total: new Decimal('0'),
        asset: new Decimal('0'),
        fx: new Decimal('0')
      },
      DTD: {
        total: new Decimal('0'),
        asset: new Decimal('0'),
        fx: new Decimal('0')
      }
    }
    const aggPNL = new AggregatePNL(params)
    expect({ ...aggPNL }).toEqual(expect.objectContaining(expectedParams))
  })
})
