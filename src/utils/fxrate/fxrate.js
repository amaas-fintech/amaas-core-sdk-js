import { retrieveData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.FXRate
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
    AMaaSClass: 'fxRate',
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

export function insert({ AMID, businessDate }, callback) {
  const params = {
    AMaaSClass: 'fxRate',
    AMId,
    resourceId: `${businessDate}`
  }
  let promise = insertData(params).then(result => {
    result = _parseAM(result)
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
    AMaaSClass: 'fxRate',
    AMId,
    resourceId: `${businessDate}/${assetIds}`
  }
  let promise = putData(params).then(result => {
    result = _parseAM(result)
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
