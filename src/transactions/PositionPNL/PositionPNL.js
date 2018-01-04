import Decimal from 'decimal.js'

import { AMaaSModel } from '../../core'

/**
 * Class representing Position Profit and Loss
 * @memberof module:transactions
 * @extends module:core.AMaaSModel
 */
class PositionPNL extends AMaaSModel {
  /**
   * Construct a new PositionPNL object
   * @param {object} params - PositionPNL creation options
   * @param {string} params.assetId - ID of the PositionPNL's Asset
   * @param {number} params.assetManagerId - ID of the PositionPNL's Asset Manager
   * @param {Decimal} params.assetPnl - PNL of asset
   * @param {string} params.bookId - ID of PositionPNL's book
   * @param {number} params.clientId - Id of TransactionPNL's client
   * @param {string} params.businessDate - Date of PositionPNL
   * @param {Decimal} params.fxPnl - FX Profit & Loss
   * @param {string} params.message - Message
   * @param {string} params.periods - Sort of PNL
   * @param {string} params.pnlStatus- Status of PositionPNL
   * @param {string} params.pnlTimeStamp - Proft & Loss Timestamp
   * @param {Decimal} params.quantity - Quantity of PositionpNL
   * @param {Decimal} params.realisedPnl - Realised Profit & Loss of PositionPNL
   * @param {Decimal} params.totalPnl - Total Profit & Loss of PositionPNL
   * @param {Decimal} params.unrealisedPnl - Unrealised Profit & Loss of PositionPNL
   * @param {string} params.createdBy - Creator of PositionPNL
   * @param {string} params.updatedBy - Latest user who updated the PositionPNL
   * @param {string} params.createdTime - Created Time of the PositionPNL
   * @param {string} params.updatedTime - Updated Time of the PositionPNL
   * @param {number} params.version - Version of the PositionPNL
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
    currency,
    period,
    pnlStatus,
    pnlTimestamp,
    quantity,
    realisedPnl,
    totalPnl,
    unrealisedPnl,
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
      _quantity: { writable: true, enumerable: false },
      quantity: {
        get: () => this._quantity,
        set: (newQuantity = 0) => {
          this._quantity = new Decimal(newQuantity || 0)
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
      _totalPnl: { writable: true, enumerable: false },
      totalPnl: {
        get: () => this._totalPnl,
        set: (newTotalPnl = 0) => {
          this._totalPnl = new Decimal(newTotalPnl || 0)
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
    this.unrealisedPnl = unrealisedPnl
    this.currency = currency
  }
}

export default PositionPNL
