import { retrieveData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.Curve
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of curve data
 * @param {string} params.businessDate - Business date (yyyy-mm-dd) of the curve data
 * @param {string} params.assetIds - Which asset to retrieve curve data for
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function retrieve({ AMId, businessDate, assetIds }, callback) {
  const params = {
    AMaaSClass: 'curve',
    AMId,
    resourceId: `${businessDate}/${assetIds}`
  }
  let promise = retrieveData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    return promise
  }
  promise.catch(error => callback(error))
}
