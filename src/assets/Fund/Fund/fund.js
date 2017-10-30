import Decimal from 'decimal.js'

import Asset from '../../Asset/asset'
import { FUND_TYPES } from '../../enums.js'

/**
 * Class representing a Fund
 * @memberof module:assets
 * @extends module:assets.Asset
 */
class Fund extends Asset {
  /**
   * Construct a new Fund instance
   * @param {object} params - Fund creation options:
   * @param {number} params.assetManagerId - ID of Fund's Asset Manager. Asset Manager refers to AMaaS user, NOT an asset manager in the Fund. __(required)__
   * @param {number} params.assetId - ID of the Fund __(required)__
   * @param {string} [params.assetClass=Fund] - Class of the Fund (a subclass of Fund may define its own assetClass)
   * @param {string} [params.assetType] - Type of the Fund. Auto-set based on the class or subclass constructor
   * @param {string} [params.assetTypeDisplay] - Auto-set to the spaced class name (e.g. `Listed Derivative` for `ListedDerivative()`)
   * @param {boolean} [params.fungible=true] - Auto-set to `true` for Fund __(read-only)__
   * @param {string} [params.assetIssuerId] - ID of the Fund's issuer
   * @param {string} [params.assetStatus=Active] - Status of the Fund
   * @param {string} [params.countryId] - ID of Fund's country
   * @param {string} [params.venueId] - ID of Fund's venue if applicable
   * @param {string} [params.currency] - Fund currency (e.g. USD, SGD)
   * @param {string} [params.description] - Description of the Fund
   * @param {string} [params.displayName] - Display name of the Fund
   * @param {boolean} [params.rollPrice=true] - Whether to roll the price for the Fund
   * @param {string} [params.clientId] - ID of the associated client
   * @param {string} params.fundType - Type of Fund __(required)__<br />
   * Available options:
   * <li>Open</li>
   * <li>Closed</li>
   * <li>ETF</li>
   * @param {string} [params.creationDate=0001-01-01] - Fund's creation date (YYYY-MM-DD)
   * @param {number} [params.nav] - Fund's Net Asset Value. Stored as a Decimal instance
   * @param {number} [params.expenseRatio] - Fund's expense ratio. Stored as a Decimal instance
   * @param {number} [params.netAssets] - Fund's net assets. Stored as a Decimal instance
   * @param {object} [params.comments] - Object of Comments attached to the Fund
   * @param {object} [params.links] - Object of array of Links attached to the Fund
   * @param {object} [params.references={ AMaaS: Reference() }] - Object of References associated with the Fund. * The AMaaS Reference is auto-created and populated
   * @param {string} [params.createdBy] - ID of the user that created the Fund
   * @param {string} [params.updatedBy] - ID of the user that updated the Fund
   * @param {date} [params.createdTime] - Time that the Fund was created
   * @param {date} [params.updatedTime] - Time that the Fund was updated
   * @param {number} [params.version] - Version number
  */
  constructor({
    assetManagerId,
    assetId,
    assetClass = 'Fund',
    fungible,
    assetIssuerId,
    assetStatus = 'Active',
    countryId,
    venueId,
    currency,
    description = '',
    displayName,
    rollPrice,
    clientId,
    fundType,
    creationDate,
    nav,
    expenseRatio,
    netAssets,
    comments,
    links,
    references,
    createdBy,
    updatedBy,
    createdTime,
    updatedTime,
    version
  }) {
    super({
      assetManagerId,
      assetId,
      assetClass,
      fungible: true,
      assetIssuerId,
      assetStatus,
      countryId,
      venueId,
      currency,
      description,
      displayName,
      rollPrice,
      clientId,
      comments,
      links,
      references,
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
    Object.defineProperties(this, {
      _creationDate: { writable: true, enumerable: false },
      creationDate: {
        get: () => this._creationDate,
        set: newCreationDate => {
          if (newCreationDate) {
            this._creationDate = newCreationDate
          } else {
            this._creationDate = '0001-01-01'
          }
        },
        enumerable: true
      },
      _fundType: { writable: true, enumerable: false },
      fundType: {
        get: () => this._fundType,
        set: newFundType => {
          if (newFundType) {
            if (FUND_TYPES.indexOf(newFundType) === -1) {
              throw new Error(`Invalid Fund Type: ${newFundType}`)
            }
            this._fundType = fundType
          }
        },
        enumerable: true
      },
      _expenseRatio: { writable: true, enumerable: false },
      expenseRatio: {
        get: () => this._expenseRatio,
        set: newExpenseRatio => {
          if (!newExpenseRatio) {
            this._expenseRatio = new Decimal(0)
          } else {
            this._expenseRatio = new Decimal(newExpenseRatio)
          }
        },
        enumerable: true
      },
      _nav: { writable: true, enumerable: false },
      nav: {
        get: () => this._nav,
        set: newNav => {
          if (!newNav) {
            this._nav = new Decimal(0)
          } else {
            this._nav = new Decimal(newNav)
          }
        },
        enumerable: true
      }
    })
    this.fundType = fundType
    this.creationDate = creationDate
    this.nav = nav
    this.expenseRatio = expenseRatio
    this.netAssets = netAssets
  }
}

export default Fund
