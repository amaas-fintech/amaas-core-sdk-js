import { retrieveData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.AggregatePNL
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of the Profit and Loss record
 * @param {object} params.query - Object of query params:<br/>
 * Available keys are:
 * <li>`string or string[]` bookIds</li>
 * <li>`string` businessDate</li>
 * <li>`string` currency</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'aggregatepnl',
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
