import Decimal from 'decimal.js'
import isEmpty from 'lodash/isEmpty'

import { AMaaSModel } from '../../core'

/**
 * Class representing a TransactionPNL
 * @memberof module:transactions
 * @extends module:core.AMaaSModel
 */
class TransactionPNL extends AMaaSModel {
  /**
   * Construct a new TransactionPNL object
   * @param {object} params - TransactionPNL creation options
   * @param {number} params.assetManagerId - ID of the TransactionPNL's Asset Manager
   * @param {string} params.bookId - ID of TransactionPNL's book
   * @param {string} params.assetId - ID of the TransactionPNL's Asset
   * @param {string} params.businessDate - Date of TransactionPNL
   * @param {string} params.pnlTimeStamp - Proft & Loss Timestamp
   * @param {number} params.clientId - Id of TransactionPNL's client
   * @param {string} params.currency - Currency of TransactionPNL
   * @param {Decimal} params.quantity - Quantity of TransactionPNL
   * @param {string} params.transactionId - ID of the TransactionPNL's Transaction
   * @param {Object} params.YTD - YTD PnL
   * @param {Object} params.MTD - MTD PnL
   * @param {Object} params.DTD - DTD PnL
   * @param {string} params.createdBy - Creator of TransactionPNL
   * @param {string} params.updatedBy - Latest user who updated the TransactionPNL
   * @param {string} params.createdTime - Created Time of the TransactionPNL
   * @param {string} params.updatedTime - Updated Time of the TransactionPNL
   * @param {number} params.version - Version of the TransactionPNL
   */
  constructor({
    assetManagerId,
    bookId,
    assetId,
    businessDate,
    pnlTimestamp,
    clientId,
    currency,
    quantity,
    transactionId,
    YTD,
    MTD,
    DTD,
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
    function castPNL(pnl) {
      if (isEmpty(pnl)) return {}
      return {
        ...pnl,
        unrealisedPnl: new Decimal(pnl.unrealisedPnl || 0),
        fxPnl: new Decimal(pnl.fxPnl || 0),
        totalPnl: new Decimal(pnl.totalPnl || 0),
        assetPnl: new Decimal(pnl.assetPnl || 0),
        realisedPnl: new Decimal(pnl.realisedPnl || 0)
      }
    }
    Object.defineProperties(this, {
      _YTD: { writable: true, enumerable: false },
      YTD: {
        get: () => this._YTD,
        set: (newYTD = {}) => {
          this._YTD = castPNL(newYTD)
        },
        enumerable: true
      },
      _MTD: { writable: true, enumerable: false },
      MTD: {
        get: () => this._MTD,
        set: (newMTD = {}) => {
          this._MTD = castPNL(newMTD)
        },
        enumerable: true
      },
      _DTD: { writable: true, enumerable: false },
      DTD: {
        get: () => this._DTD,
        set: (newDTD = {}) => {
          this._DTD = castPNL(newDTD)
        },
        enumerable: true
      },
      _quantity: { writable: true, enumerable: false },
      quantity: {
        get: () => this._quantity,
        set: (newQuantity = 0) => {
          this._quantity = new Decimal(newQuantity || 0)
        },
        enumerable: true
      }
    })
    this.assetManagerId = assetManagerId
    this.bookId = bookId
    this.assetId = assetId
    this.businessDate = businessDate
    this.pnlTimestamp = pnlTimestamp
    this.clientId = clientId
    this.currency = currency
    this.quantity = quantity
    this.transactionId = transactionId
    this.YTD = YTD
    this.MTD = MTD
    this.DTD = DTD
  }
}

export default TransactionPNL
