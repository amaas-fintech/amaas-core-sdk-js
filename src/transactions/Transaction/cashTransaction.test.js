import CashTransaction from './cashTransaction.js'
const Decimal = require('decimal.js')

describe('CashTransaction class', () => {
  let testCashTransaction
  beforeEach(() => {
    const data = { assetManagerId: 123, transactionType: 'Coupon' }
    testCashTransaction = new CashTransaction(data)
  })
  it('should set Price correctly', () => {
    expect(testCashTransaction.price).toEqual(new Decimal(1)) 
  })
})

describe('Invalid transactionType CashTransaction class', () => {
  let testCashTransaction
  const data = { assetManagerId: 123, transactionType: 'Allocation' }
  it('should throw error', () => {
    const willThrow = () => {
      new CashTransaction(data)
    }
    expect(willThrow).toThrowError(new Error('Invalid Transaction Type: Allocation'))
  })
})
