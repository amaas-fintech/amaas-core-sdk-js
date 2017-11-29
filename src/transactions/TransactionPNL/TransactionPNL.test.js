import TransactionPNL from './TransactionPNL'

describe('TransactionPNL', () => {
  it('constructs', () => {
    const params = {
      assetManagerId: 88,
      assetId: 'testAsset',
      assetPnl: 1,
      bookId: 'testBook',
      businessDate: '2017-07-04',
      clientId: 1,
      fxPnl: 2,
      message: 'test message',
      period: 'DTD',
      pnlStatus: 'Active',
      pnlTimestamp: 'timestamp',
      quantity: 3,
      realisedPnl: 4,
      totalPnl: 5,
      transactionId: 'testTransaction',
      unrealisedPnl: 6,
      currency: 'USD',
      createdBy: 'testUser',
      updatedBy: 'testUser',
      createdTime: '2017-07-04',
      updatedTime: '2017-07-04',
      version: 1
    }
    const pnl = new TransactionPNL(params)
    expect({ ...pnl }).toEqual(expect.objectContaining(params))
  })
})
