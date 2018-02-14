import Decimal from 'decimal.js'

import PositionPNL from './PositionPNL'

describe('PositionPNL', () => {
  it('constructs', () => {
    const params = {
      assetManagerId: 88,
      bookId: 'testBook',
      assetId: 'testAsset',
      businessDate: '2017-07-04',
      pnlTimestamp: 'timestamp',
      clientId: 1,
      currency: 'USD',
      quantity: 3,
      YTD: {
        createdTime: '2018-01-28T13:23:08.289166',
        realisedPnl: null,
        updatedBy: 'amaas_batch',
        createdBy: 'amaas_batch',
        pnlStatus: 'Active',
        totalPnl: '24691.0046207302',
        assetPnl: '18759.4739256770',
        errorMessage: null,
        unrealisedPnl: null,
        version: 1,
        internalId: 7075,
        fxPnl: '5931.5306950534',
        updatedTime: '2018-01-28T13:23:08.289166'
      }
    }
    const expectedParams = {
      ...params,
      quantity: new Decimal(params.quantity),
      YTD: {
        createdTime: '2018-01-28T13:23:08.289166',
        realisedPnl: new Decimal(0),
        updatedBy: 'amaas_batch',
        createdBy: 'amaas_batch',
        pnlStatus: 'Active',
        totalPnl: new Decimal('24691.0046207302'),
        assetPnl: new Decimal('18759.4739256770'),
        errorMessage: null,
        unrealisedPnl: new Decimal(0),
        version: 1,
        internalId: 7075,
        fxPnl: new Decimal('5931.5306950534'),
        updatedTime: '2018-01-28T13:23:08.289166'
      }
    }
    const pnl = new PositionPNL(params)
    expect({ ...pnl }).toEqual(expect.objectContaining(expectedParams))
  })
})
