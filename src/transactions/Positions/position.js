import Decimal from 'decimal.js'
import { AMaaSModel } from '../../core'

/**
 * Class representing a Position
 * @memberof module:transactions
 * @extends module:core.AMaaSModel
 */
class Position extends AMaaSModel {
  /**
   * Construct a new Position object
   * @param {object} params - Position creation options
   * @param {number} params.assetManagerId - Owning Asset Manager's ID
   * @param {string} params.bookId - Book that the Position belongs to
   * @param {string} params.assetId - Asset for the Position
   * @param {Decimal} params.quantity - Quantity of the Position
   * @param {string} params.validFrom - Timestamp that the Position is valid from (for the given price)
   * @param {string} params.validTo - Timestamp that the Position is valid to (should be max date for currently valid Positions)
   * @param {string} params.accountingType - Accounting Type of the Position ("Transaction Date" or "Settlement Date")
   * @param {string} params.accountId - Account ID of the Position
   */
  constructor({
    assetManagerId,
    bookId,
    assetId,
    quantity,
    averagePrice,
    validFrom,
    internalId,
    validTo,
    clientId,
    accountingType,
    accountId,
    createdBy,
    updatedBy,
    createdTime,
    updatedTime,
    version
  }) {
    super({
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
    Object.defineProperties(this, {
      _quantity: { writable: true, enumerable: false },
      quantity: {
        get: () => this._quantity,
        set: (newQuantity = 0) => {
          this._quantity = new Decimal(newQuantity)
        },
        enumerable: true
      },
      _averagePrice: { writable: true, enumerable: false },
      averagePrice: {
        get: () => this._averagePrice,
        set: (newAveragePrice = 0) => {
          this._averagePrice = new Decimal(newAveragePrice)
        },
        enumerable: true
      }
    })
    this.assetManagerId = assetManagerId
    this.bookId = bookId
    this.assetId = assetId
    this.quantity = quantity
    this.averagePrice = averagePrice
    this.validFrom = validFrom
    this.internalId = internalId
    this.validTo = validTo
    this.clientId = clientId
    this.accountingType = accountingType
    this.accountId = accountId
  }
}

export default Position
