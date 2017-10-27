import Asset from '../Asset/asset.js'

/**
 * Class representing an Currency
 * @memberof module:assets
 * @extends module:assets.Asset
 */
class Currency extends Asset {
  /**
   * Construct a new Currency instance
   * @param {object} params - Currency creation options:
   * @param {number} params.assetManagerId - ID of Currency's Asset Manager __(required)__
   * @param {number} params.assetId - ID of the Currency __(required)__
   * @param {string} [params.assetClass=Currency] - Auto-set to `Currency` __(read-only)__
   * @param {string} [params.assetType] - Type of the Currency. Auto-set based on the class or subclass constructor
   * @param {string} [params.assetTypeDisplay] - Auto-set to the spaced class name (e.g. `Listed Derivative` for `ListedDerivative()`)
   * @param {boolean} [params.fungible=true] - Auto-set to `true` for Currency
   * @param {string} [params.assetIssuerId] - ID of the Currency issuer
   * @param {string} [params.assetStatus=Active] - Status of the Currency
   * @param {string} [params.countryId] - ID of Currency's country
   * @param {string} [params.venueId] - ID of Currency's venue if applicable
   * @param {string} [params.currency] - Auto-set to 'assetId' __(read-only)__
   * @param {string} [params.description] - Description of the Currency
   * @param {string} [params.displayName] - Display name of the Currency
   * @param {string} [params.clientId] - ID of associated client
   * @param {boolean} [params.deliverable=true] - Whether the Currency is deliverable
   * @param {number} [params.minorUnitPlaces] - Decimal precision of Currency (e.g. 4 for JPY, 2 for USD)
   * @param {object} [params.comments] - Object of Comments attached to the Currency
   * @param {object} [params.links] - Object of array of Links attached to the Currency
   * @param {object} [params.references={ AMaaS: Reference() }] - Object of References attached to the Currency. * The AMaaS Reference is auto-created and populated
   * @param {string} [params.createdBy] - ID of the user that created the Asset
   * @param {string} [params.updatedBy] - ID of the user that updated the Asset
   * @param {date} [params.createdTime] - Time that the Asset was created
   * @param {date} [params.updatedTime] - Time that the Asset was updated
   * @param {number} [params.version] - Version number of the Asset
  */
  constructor({
    assetManagerId,
    assetId,
    assetClass = 'Currency',
    fungible,
    assetIssuerId,
    assetStatus = 'Active',
    countryId,
    venueId,
    description = '',
    displayName,
    clientId,
    deliverable,
    minorUnitPlaces,
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
      assetClass: 'Currency',
      fungible: true,
      assetIssuerId,
      assetStatus,
      countryId,
      venueId,
      currency: assetId,
      description,
      displayName,
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
    this.deliverable = deliverable === false ? false : true // Default to true
    this.minorUnitPlaces = minorUnitPlaces
  }
}

export default Currency
