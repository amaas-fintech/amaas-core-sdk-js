import Decimal from 'decimal.js'

import CorporateAction from '../CorporateAction'

/**
 * Class representing a Dividend
 * @memberof module:corporateActions
 * @extends module:coporateActions.CorporateAction
 */
class Dividend extends CorporateAction {
  constructor({
    assetManagerId,
    corporateActionId,
    corporateActionStatus,
    recordDate,
    declaredDate,
    settlementDate,
    assetId,
    partyId,
    elective,
    message,
    dividendRate,
    dividendAssetId, // Have this as well as assetId?
    description,
    references,
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
      _dividendRate: { writable: true, enumerable: false },
      dividendRate: {
        get: () => this._dividendRate,
        set: newDividendRate => {
          this._dividendRate = new Decimal(newDividendRate || 0)
        },
        enumerable: true
      }
    })

    this.dividendRate = dividendRate
    this.dividendAssetId = dividendAssetId
  }
}

export default Dividend
