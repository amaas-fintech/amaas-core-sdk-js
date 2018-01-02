import { retrieveData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.ForwardRate
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID
 * @param {object} params.query - Object of query params:<br/>
 * Available keys are:
 * <li>`string` businessDateStart</li>
 * <li>`string` businessDateEnd</li>
 * <li>`string` tenor</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */

export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'forwardrate',
    AMId,
    query
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
