import Decimal from 'decimal.js'
import isEmpty from 'lodash/isEmpty'

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
   * @param {number} params.assetManagerId - ID of the PositionPNL's Asset Manager
   * @param {string} params.bookId - ID of PositionPNL's book
   * @param {string} params.assetId - ID of the PositionPNL's Asset
   * @param {string} params.businessDate - Date of PositionPNL
   * @param {string} params.pnlTimeStamp - Proft & Loss Timestamp
   * @param {number} params.clientId - Id of TransactionPNL's client
   * @param {string} params.currency - PNL Currency
   * @param {Decimal} params.quantity - Quantity of PositionpNL
   * @param {Object} params.YTD - YTD PnL
   * @param {Object} params.MTD - MTD PnL
   * @param {Object} params.DTD - DTD PnL
   * @param {string} params.createdBy - Creator of PositionPNL
   * @param {string} params.updatedBy - Latest user who updated the PositionPNL
   * @param {string} params.createdTime - Created Time of the PositionPNL
   * @param {string} params.updatedTime - Updated Time of the PositionPNL
   * @param {number} params.version - Version of the PositionPNL
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
        totalPnl: new Decimal(pnl.totalPnl || 0),
        assetPnl: new Decimal(pnl.assetPnl || 0),
        fxPnl: new Decimal(pnl.fxPnl || 0),
        realisedPnl: new Decimal(pnl.realisedPnl || 0),
        unrealisedPnl: new Decimal(pnl.unrealisedPnl || 0)
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
    this.YTD = YTD
    this.MTD = MTD
    this.DTD = DTD
  }
}

export default PositionPNL
