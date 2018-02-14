import Decimal from 'decimal.js'

import TransactionPNL from './TransactionPNL'

describe('TransactionPNL', () => {
  it('constructs', () => {
    const params = {
      assetManagerId: 88,
      bookId: 'book-1',
      assetId: 'asset-1',
      businessDate: '2018-07-04',
      pnlTimestamp: '2018-07-04',
      clientId: 1,
      currency: 'USD',
      quantity: 435.1,
      transactionId: '123',
      YTD: {
        createdTime: '2018-07-04',
        updatedBy: 'user',
        unrealisedPnl: 45.12,
        transactionDate: '2018-07-04',
        pnlStatus: 'Active',
        additional: {
          quantity: 213,
          'SGDUSD 2018-01-28': 12412,
          'SGDUSD 2017-12-31': 12412,
          'SGDUSD 2017-05-14': 12412,
          '000001.CS 2018-01-28': 5468,
          '000001.CS 2017-12-31': 5468,
          'cost price': 694
        },
        version: 1,
        fxPnl: 456.234,
        totalPnl: 56974.2345,
        errorMessage: '',
        updatedTime: '2018-07-04',
        assetPnl: 34589.234,
        realisedPnl: 657.3,
        createdBy: 'user'
      }
    }
    const expectedParams = {
      ...params,
      quantity: new Decimal(params.quantity),
      YTD: {
        createdTime: '2018-07-04',
        updatedBy: 'user',
        unrealisedPnl: new Decimal(45.12),
        transactionDate: '2018-07-04',
        pnlStatus: 'Active',
        additional: {
          quantity: 213,
          'SGDUSD 2018-01-28': 12412,
          'SGDUSD 2017-12-31': 12412,
          'SGDUSD 2017-05-14': 12412,
          '000001.CS 2018-01-28': 5468,
          '000001.CS 2017-12-31': 5468,
          'cost price': 694
        },
        version: 1,
        fxPnl: new Decimal(456.234),
        totalPnl: new Decimal(56974.2345),
        errorMessage: '',
        updatedTime: '2018-07-04',
        assetPnl: new Decimal(34589.234),
        realisedPnl: new Decimal(657.3),
        createdBy: 'user'
      }
    }
    const pnl = new TransactionPNL(params)
    expect({ ...pnl }).toEqual(expect.objectContaining(expectedParams))
  })
})
