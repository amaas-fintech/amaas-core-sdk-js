import Decimal from 'decimal.js'

import Future from '../Future/future'
import { OPTION_STYLES, OPTION_TYPES } from '../../enums.js'

/**
 * Class representing a Future Option
 * @memberof module:assets
 * @extends module:assets.Future
 */
class FutureOption extends Future {
  /**
   * Construct a new Future Option instance
   * @param {object} params - Future Option creation options:
   * @param {number} params.assetManagerId - ID of Future Option's Asset Manager __(required)__
   * @param {number} params.assetId - ID of the Future Option __(required)__
   * @param {string} [params.assetClass=Future] - Auto-set to `Future` __(read-only)__
   * @param {string} [params.assetType] - Type of the Future Option. Auto-set based on the class or subclass constructor
   * @param {string} [params.assetTypeDisplay] - Auto-set to the spaced class name (e.g. `Listed Derivative` for `ListedDerivative()`)
   * @param {boolean} [params.fungible=true] - Auto-set to `true` for Future subclasses __(read-only)__
   * @param {string} [params.assetIssuerId] - ID of the Future Option's issuer
   * @param {string} [params.assetStatus=Active] - Status of the Future Option
   * @param {string} [params.countryId] - ID of Future Option's country
   * @param {string} [params.venueId] - ID of Future Option's venue if applicable
   * @param {string} [params.currency] - Future Option currency (e.g. USD, SGD)
   * @param {string} [params.issueDate=0001-01-01] - Issue date if applicable (YYYY-MM-DD)
   * @param {string} [params.expiryDate=9999-12-31] - Expiry date (YYYY-MM-DD)
   * @param {string} [params.description] - Description of the Future Option
   * @param {string} [params.displayName] - Display name of the Furure Option
   * @param {string} [params.clientId] - ID of the associated client
   * @param {string} params.settlementType - Settlement Type __(required)__<br />
   * Available options:
   * <li>Cash</li>
   * <li>Physical</li>
   * @param {number} params.contractSize - Contract Size __(required)__
   * @param {number} [params.pointValue] - Future point value. Stored as a Decimal instance
   * @param {number} params.tickSize - Future tick size. Stored as a Decimal instance __(required)__
   * @param {string} [params.quoteUnit] - Future quote unit
   * @param {string} params.underlyingAssetId - ID of the underlying Asset __(required)__
   * @param {string} params.optionType - Option type __(required)__<br />
   * Available options:
   * <li>Put</li>
   * <li>Call</li>
   * @param {string} params.optionStyle - Option style __(required)__<br />
   * Available options:
   * <li>American</li>
   * <li>Bermudan</li>
   * <li>European</li>
   * @param {number} params.strike - Strike price __(required)__
   * @param {object} [params.comments] - Object of Comments attached to the Future Option
   * @param {object} [params.links] - Object of array of Links attached to the Future Option
   * @param {object} [params.references={ AMaaS: Reference() }] - Object of References associated with the Future Option
   * @param {string} [params.createdBy] - ID of the user that created the Future Option
   * @param {string} [params.updatedBy] - ID of the user that updated the Future Option
   * @param {date} [params.createdTime] - Time that the Future Option was created
   * @param {date} [params.updatedTime] - Time that the Future Option was updated
   * @param {number} [params.version] - Version number
   */
  constructor({
    assetManagerId,
    assetId,
    assetIssuerId,
    assetStatus = 'Active',
    countryId,
    venueId,
    currency,
    issueDate,
    description = '',
    displayName,
    clientId,
    settlementType,
    contractSize,
    pointValue,
    tickSize,
    quoteUnit,
    underlyingAssetId,
    expiryDate,
    optionType,
    optionStyle,
    strike,
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
      assetIssuerId,
      assetStatus,
      countryId,
      venueId,
      currency,
      issueDate,
      description,
      displayName,
      clientId,
      settlementType,
      contractSize,
      pointValue,
      tickSize,
      quoteUnit,
      underlyingAssetId,
      expiryDate,
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
      _optionType: { writable: true, enumerable: false },
      optionType: {
        get: () => this._optionType,
        set: newOptionType => {
          if (newOptionType) {
            if (OPTION_TYPES.indexOf(newOptionType) === -1) {
              throw new Error(`Invalid Option Type: ${newOptionType}`)
            }
            this._optionType = newOptionType
          }
        },
        enumerable: true
      },
      _optionStyle: { writable: true, enumerable: false },
      optionStyle: {
        get: () => this._optionStyle,
        set: newOptionStyle => {
          if (newOptionStyle) {
            if (OPTION_STYLES.indexOf(newOptionStyle) === -1) {
              throw new Error(`Invalid Option Style: ${newOptionStyle}`)
            }
            this._optionStyle = newOptionStyle
          }
        },
        enumerable: true
      },
      _strike: { writable: true, enumerable: false },
      strike: {
        get: () => this._strike,
        set: (newStrike = 0) => {
          this._strike = new Decimal(newStrike || 0)
        },
        enumerable: true
      }
    })
    this.optionType = optionType
    this.optionStyle = optionStyle
    this.strike = strike
  }
}

export default FutureOption
