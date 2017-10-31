import CashTransaction from './cashTransaction.js'

const Decimal = require('decimal.js')

describe('CashTransaction class', () => {
  let testCashTransaction
  beforeEach(() => {
    const data = { assetManagerId: 123 }
    testCashTransaction = new CashTransaction(data)
  })
  it('should set Price correctly', () => {
    expect(testCashTransaction.price).toEqual(new Decimal(1)) 

  })
})
