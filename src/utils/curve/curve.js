import { retrieveData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.Curve
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of the Profit and Loss record
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

export function insert({ AMID, businessDate }, callback) {
  const params = {
    AMaaSClass: 'curve',
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

export function amend({ AMId, businessDate, assetIds, data }, callback) {
  const params = {
    AMaaSClass: 'curve',
    AMId,
    resourceId: `${businessDate}/${assetIds}`,
    data: JSON.parse(JSON.stringify(data || {}))
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

export function deactivate({ AMId, businessDate, assetIds, data }, callback) {
  const params = {
    AMaaSClass: 'curve',
    AMId,
    resourceId: `${businessDate}/${assetIds}`,
    data: JSON.parse(JSON.stringify(data || {}))
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