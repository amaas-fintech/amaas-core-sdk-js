import Decimal from 'decimal.js'
import Position from './position.js'

const posParams = {
  assetManagerId: 8,
  bookId: 'book-1',
  assetId: 'abc',
  quantity: 1000,
  averagePrice: 500.04,
  validFrom: '2017-01-01',
  internalId: 1,
  validTo: '2017-07-04',
  clientId: 1,
  accountingType: 'Transaction Date',
  accountId: 'Asset'
}

describe('Position class', () => {
  describe('serialization', () => {
    it('should construct properly', () => {
      const test = new Position(posParams)
      const expectedAttrs = {
        ...posParams,
        quantity: new Decimal(1000),
        averagePrice: new Decimal(500.04)
      }
      expect({ ...test }).toEqual(expect.objectContaining(expectedAttrs))
    })
  })
  describe('constructor', () => {
    it('should set quantity as a Decimal', () => {
      const testPos = new Position({ quantity: 5.66753 })
      expect(testPos.quantity).toBeInstanceOf(Decimal)
      expect(testPos.quantity).toEqual(new Decimal(5.66753))
    })
  })
})
