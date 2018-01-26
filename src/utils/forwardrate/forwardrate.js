import { retrieveData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.ForwardRate
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID
 * @param {number} params.assetIds - Asset Id
 * @param {object} params.query - Object of query params:<br/>
 * Available keys are:
 * <li>`string` businessDateStart</li>
 * <li>`string` businessDateEnd</li>
 * <li>`string` tenor</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */

export function retrieve({ AMId, assetIds, query }, callback) {
  const params = {
    AMaaSClass: 'forwardRate',
    AMId,
    query,
    resourceId: `${assetIds}`
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

export function insert({ AMID, businessDate }, callback) {
  const params = {
    AMaaSClass: 'forwardRate',
    AMId,
    resourceId: `${businessDate}`
  }
  let promise = insertData(params).then(result => {
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

export function amend({ AMId, businessDate, assetIds }, callback) {
  const params = {
    AMaaSClass: 'forwardRate',
    AMId,
    resourceId: `${businessDate}/${assetIds}`
  }
  let promise = putData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    // return promise if callback is not provided
    return promise
  }
  promise.catch(error => callback(error))
}
