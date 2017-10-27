/**
 * Classes for the Assets service
 * @module assets
 */

// Classes
import * as assets from '../assets'

// Enums
import * as assetEnums from '../assets/enums'

// Generate the list of types from the main asset export
// rather than writing it out
export const getAssetTypes = () => {
  const assetTypeList = []
  forEach(assets, (val, key) => {
    assetTypeList.push(key.toString())
  })
  return assetTypeList
}

const assetUtils = { ...assetEnums, getAssetTypes }

// Exports
export { assets, assetUtils }
