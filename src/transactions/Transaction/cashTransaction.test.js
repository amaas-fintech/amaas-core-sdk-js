import CashTransaction from './cashTransaction.js'
const Decimal = require('decimal.js')

describe('CashTransaction class', () => {
  let testCashTransaction
  beforeEach(() => {
    const data = { assetManagerId: 123, transactionType: 'Cashflow' }
    testCashTransaction = new CashTransaction(data)
  })
  it('should set Price correctly', () => {
    expect(testCashTransaction.price).toEqual(new Decimal(1)) 
  })
})

describe('CashTransaction class with valid transaction type', () => {
  let testCashTransaction
  beforeEach(() => {
    testCashTransaction = new CashTransaction({ assetManagerId: 123, transactionType: 'Cashflow' })
  })
  it('should initialise a new class', () => {
    expect(typeof testCashTransaction).toBe('object')
  })
})

describe('CashTransaction class with invalid transaction type', () => {
  it('should throw error', () => {
    const willThrow = () => {
      new CashTransaction({ assetManagerId: 123, transactionType: 'Allocation' })
    }
    expect(willThrow).toThrowError(new Error('Invalid Cash Transaction Type: Allocation'))
  })
})
