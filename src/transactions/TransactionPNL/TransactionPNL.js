import { AMaaSModel } from '../../core'

/**
 * Class representing a TransactionPNL
 * @memberof module:transactionpnl
 * @extends module:core.AMaaSModel
 */

class TransactionPNL extends AMaaSModel {
  /**
  * Construct a new TransactionPNL object
  * @param {object} params - TransactionPNL creation options
  * @param {string} params.assetId - ID of the TransactionPNL's Asset
  * @param {string} params.assetManagerId - ID of the TransactionPNL's Asset Manager
  * @param {string} params.assetPnl - PNL of asset
  * @param {string} params.bookId - ID of TransactionPNL's book
  * @param {Date} params.businessDate - Date of TransactionPNL
  * @param {string} params.clientId - Id of TransactionPNL's client
  * @param {string} params.fxPnl - FX Profit & Loss
  * @param {Date} params.pnlTimeStamp - Proft & Loss Timestamp
  * @param {number} params.quantity - Quantity of TransactionPNL
  * @param {string} params.realisedPnl - Realised Profit & Loss of TransactionPNL
  * @param {string} params.totalPnl - Total Profit & Loss of TransactionPNL
  * @param {string} params.transactionId - ID of the TransactionPNL's Transaction
  * @param {string} params.unrealisedPnl - Unrealised Profit & Loss of TransactionPNL
  * @param {string} params.currency - Currency of TransactionPNL
  * @param {string} params.createdBy - Creator of TransactionPNL
  * @param {string} params.updatedBy - Latest user who updated the TransactionPNL
  * @param {string} params.createdTime - Created Time of the TransactionPNL
  * @param {string} params.updatedTime - Updated Time of the TransactionPNL
  * @param {string} params.version - Version of the TransactionPNL
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
    this.quantity = quantity
    this.realisedPnl = realisedPnl
    this.totalPnl = totalPnl
    this.transactionId = transactionId
    this.unrealisedPnl = unrealisedPnl
    this.currency = currency
  }
}
