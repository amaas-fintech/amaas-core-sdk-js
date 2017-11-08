import { AMaaSModel } from '../../core'

/**
 * Class representing PNLResult
 * @memberof module:PNLResult
 * @extends module:core.AMaaSModel
 */
class PNLResult extends AMaaSModel {
  /**
   * Construct a new PNLResult object
   * @param {object} params - PNLResult creation options
   * @param {number} params.clientId- ID of the PNLResult's Client 
   * @param {string} params.assetManagerId - ID of the PNLResult's Asset Manager
   * @param {string} params.assetBookId - ID of the PNLResult's book
   * @param {string} params.assetId - ID of the asset being transacted
   * @param {date} params.businessDate - Date of business made 
   * @param {string} params.realisedPNL - Realised Profit & Loss
   * @param {string} params.unrealisedPNL - Unrealised Profit & Loss
   * @param {string} params.totalPNL - Total Profit & Loss
   * @param {string} params.assetPNL- Profit & Loss Asset
   * @param {string} params.fxPNL- FX Profit & Loss 
   * @param {string} params.pnlStatus- Status Profit & Loss 
   * @param {string} params.message - Message
   * @param {string} params.version - Version
   * @param {date} params.pnlTimeStamp Timestamp of Profit & Loss
   * @param {string} params.transactionId - ID of the PNLResult's transaction
  */
  constructor({
    clientId,
    assetManagerId,
    assetId,
    bookId,
    period,
    businessDate,
    realisedPNL,
    unrealisedPNL,
    totalPNL,
    assetPNL,
    fxPNL,
    pnlStatus,
    message,
    version,
    pnlTimeStamp,
    transactionId
  }) {
    super({
      version
    })
    this.clientId = clientId
    this.assetManagerId = assetManagerId
    this.assetId =  assetId
    this.bookId = bookId
    this.period = period
    this.businessDate = businessDate
    this.realisedPNL = realisedPNL
    this.unrealisedPNL = unrealisedPNL
    this.totalPNL = totalPNL
    this.assetPNL = assetPNL
    this.message = message
    this.pnlTimeStamp = pnlTimeStamp
    this.transactionId = transactionId
  }
}

export default PNLResult
