import Fund from '../Fund/fund'

/**
 * Class representing an ETF
 * @memberof module:assets
 * @extends module:assets.Fund
 */
class ExchangeTradedFund extends Fund {
  /**
   * Construct a new ETF instance
   * @param {object} params - ExchangeTradedFund creation options:
   * @param {number} params.assetManagerId - ID of ETF's Asset Manager __(required)__
   * @param {number} params.assetId - ID of the ETF __(required)__
   * @param {string} [params.assetClass] - Auto-set to `Fund` __(read-only)__
   * @param {string} [params.assetType] - Type of the ETF. Auto-set based on the class or subclass constructor
   * @param {string} [params.assetTypeDisplay] - Auto-set to the spaced class name (e.g. `Listed Derivative` for `ListedDerivative()`)
   * @param {boolean} [params.fungible=true] - Auto-set to `true` for Fund and its subclasses
   * @param {string} [params.assetIssuerId] - ID of the ETF's issuer
   * @param {string} [params.assetStatus=Active] - Status of the ETF
   * @param {string} [params.countryId] - ID of ETF's country
   * @param {string} [params.venueId] - ID of ETF's venue if applicable
   * @param {string} [params.currency] - ETF currency (e.g. USD, SGD)
   * @param {string} [params.creationDate=0001-01-01] - ETF's creation date (YYYY-MM-DD)
   * @param {string} [params.description] - Description of the ETF
   * @param {string} [params.displayName] - Display name of the ETF
   * @param {boolean} [params.rollPrice=true] - Whether to roll the price for the ETF
   * @param {string} [params.clientId] - ID of the associated client
   * @param {string} [params.fundType=ETF] - Auto-set to `ETF` __(read-only)__
   * @param {number} [params.nav] - ETF's Net Asset Value. Stored as a Decimal instance
   * @param {number} [params.expenseRatio] - ETF's expense ratio. Stored as a Decimal instance
   * @param {number} [params.netAssets] - ETF's net assets. Stored as a Decimal instance
   * @param {object} [params.comments] - Object of Comments attached to the ETF
   * @param {object} [params.links] - Object of array of Links attached to the ETF
   * @param {object} [params.references={ AMaaS: Reference() }] - Object of References associated with the ETF. * The AMaaS Reference is auto-created and populated
   * @param {string} [params.createdBy] - ID of the user that created the ETF
   * @param {string} [params.updatedBy] - ID of the user that updated the ETF
   * @param {date} [params.createdTime] - Time that the ETF was created
   * @param {date} [params.updatedTime] - Time that the ETF was updated
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
    expiryDate,
    description = '',
    displayName,
    rollPrice,
    clientId,
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
      assetIssuerId,
      assetStatus,
      countryId,
      venueId,
      currency,
      expiryDate,
      description,
      displayName,
      rollPrice,
      clientId,
      fundType: 'ETF',
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
    })
  }
}

export default ExchangeTradedFund
