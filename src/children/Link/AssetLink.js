import Link from './Link'

class AssetLink extends Link {
  constructor({
    linkedAssetId,
    active,
    createdBy,
    updatedBy,
    createdTime,
    updatedTime,
    version
  }) {
    super({
      active,
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
    this.linkedAssetId = linkedAssetId
  }
}

export default AssetLink
