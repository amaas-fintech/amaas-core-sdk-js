import { retrieveData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.EOD
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID
 * @param {object} params.query - Object of query params:<br/>
 * Available keys are:
 * <li>`string` businessDateStart</li>
 * <li>`string` businessDateEnd</li>
 * <li>`string` assetIds</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */

export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'eod'.
    AMId,
    query
  }
  let promise = retrieveData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
  })
  if (typeof callback !== 'function') {
    return promise
  }
  promise.catch(error => callback(error))
}
