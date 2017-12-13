import Decimal from 'decimal.js'

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
   * @param {string} params.assetId - ID of the TransactionPNL's Asset
   * @param {number} params.assetManagerId - ID of the TransactionPNL's Asset Manager
   * @param {Decimal} params.assetPnl - PNL of asset
   * @param {string} params.bookId - ID of TransactionPNL's book
   * @param {string} params.businessDate - Date of TransactionPNL
   * @param {number} params.clientId - Id of TransactionPNL's client
   * @param {Decimal} params.fxPnl - FX Profit & Loss
   * @param {string} params.pnlTimeStamp - Proft & Loss Timestamp
   * @param {Decimal} params.quantity - Quantity of TransactionPNL
   * @param {Decimal} params.realisedPnl - Realised Profit & Loss of TransactionPNL
   * @param {Decimal} params.totalPnl - Total Profit & Loss of TransactionPNL
   * @param {string} params.transactionId - ID of the TransactionPNL's Transaction
   * @param {Decimal} params.unrealisedPnl - Unrealised Profit & Loss of TransactionPNL
   * @param {string} params.currency - Currency of TransactionPNL
   * @param {string} params.createdBy - Creator of TransactionPNL
   * @param {string} params.updatedBy - Latest user who updated the TransactionPNL
   * @param {string} params.createdTime - Created Time of the TransactionPNL
   * @param {string} params.updatedTime - Updated Time of the TransactionPNL
   * @param {number} params.version - Version of the TransactionPNL
   */
  constructor({
    assetId,
    assetManagerId,
    assetPnl,
    bookId,
    businessDate,
    clientId,
    fxPnl,
    message,
    period,
    pnlStatus,
    pnlTimestamp,
    quantity,
    realisedPnl,
    totalPnl,
    transactionId,
    unrealisedPnl,
    currency,
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
    // quantity
    Object.defineProperties(this, {
      _assetPnl: { writable: true, enumerable: false },
      assetPnl: {
        get: () => this._assetPnl,
        set: (newAssetPnl = 0) => {
          this._assetPnl = new Decimal(newAssetPnl || 0)
        },
        enumerable: true
      },
      _fxPnl: { writable: true, enumerable: false },
      fxPnl: {
        get: () => this._fxPnl,
        set: (newFxPnl = 0) => {
          this._fxPnl = new Decimal(newFxPnl || 0)
        },
        enumerable: true
      },
      _totalPnl: { writable: true, enumerable: false },
      totalPnl: {
        get: () => this._totalPnl,
        set: (newTotalPnl = 0) => {
          this._totalPnl = new Decimal(newTotalPnl || 0)
        },
        enumerable: true
      },
      _realisedPnl: { writable: true, enumerable: false },
      realisedPnl: {
        get: () => this._realisedPnl,
        set: (newRealisedPnl = 0) => {
          this._realisedPnl = new Decimal(newRealisedPnl || 0)
        },
        enumerable: true
      },
      _unrealisedPnl: { writable: true, enumerable: false },
      unrealisedPnl: {
        get: () => this._unrealisedPnl,
        set: (newUnrealisedPnl = 0) => {
          this._unrealisedPnl = new Decimal(newUnrealisedPnl || 0)
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
    this.assetId = assetId
    this.assetManagerId = assetManagerId
    this.assetPnl = assetPnl
    this.bookId = bookId
    this.businessDate = businessDate
    this.clientId = clientId
    this.fxPnl = fxPnl
    this.message = message
    this.period = period
    this.pnlStatus = pnlStatus
    this.pnlTimestamp = pnlTimestamp
    this.quantity = quantity
    this.realisedPnl = realisedPnl
    this.totalPnl = totalPnl
    this.transactionId = transactionId
    this.unrealisedPnl = unrealisedPnl
    this.currency = currency
  }
}

export default TransactionPNL
