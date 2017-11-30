import { AMaaSModel } from '../../core'

class PositionPNL extends AMaaSModel {
  /**
   * Construct a new PositionPNL object
   * @param {object} params - PositionPNL creation options
   * @param {string} params.assetId - ID of the PositionPNL's Asset
   * @param {number} params.assetManagerId - ID of the PositionPNL's Asset Manager
   * @param {string} params.assetPnl - PNL of asset
   * @param {string} params.bookId - ID of PositionPNL's book
   * @param {number} params.clientId - Id of TransactionPNL's client
   * @param {string} params.businessDate - Date of PositionPNL
   * @param {number} params.fxPnl - FX Profit & Loss
   * @param {string} params.message - Message
   * @param {string} params.periods - Sort of PNL
   * @param {string} params.pnlStatus- Status of PositionPNL
   * @param {string} params.pnlTimeStamp - Proft & Loss Timestamp
   * @param {number} params.quantity - Quantity of PositionpNL
   * @param {number} params.realisedPnl - Realised Profit & Loss of PositionPNL
   * @param {number} params.totalPnl - Total Profit & Loss of PositionPNL
   * @param {number} params.unrealisedPnl - Unrealised Profit & Loss of PositionPNL
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
  }
}

export default PositionPNL
