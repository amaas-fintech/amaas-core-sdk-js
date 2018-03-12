import { retrieveData, insertData, patchData, putData } from '../network'

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
export function retrieve({ AMId, businessDate, assetIds, query }, callback) {
  const params = {
    AMaaSClass: 'curve',
    AMId,
    resourceId: `${businessDate}/${assetIds}`,
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

/**
 * @function insert
 * @memberof module:api.Curve
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of curve data
 * @param {string} params.businessDate - Business date (yyyy-mm-dd) of the curve data
 * @param {object} params.data - Curve object
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function insert({ AMId, businessDate, data }, callback) {
  const params = {
    AMaaSClass: 'curve',
    AMId,
    resourceId: `${businessDate}`,
    data: JSON.parse(JSON.stringify(data || {}))
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

/**
 * @function amend
 * @memberof module:api.Curve
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of curve data
 * @param {string} params.businessDate - Business date (yyyy-mm-dd) of the curve data
 * @param {string} params.assetIds - Which asset to retrieve curve data for
 * @param {object} params.data - Curve object
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
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

/**
 * @function deactivate
 * @memberof module:api.Curve
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of curve data
 * @param {object} params.data - Minimal curve data to deactivate (`assetId`, `curveType`, `fixingType`, `businessDate`, `curveTimestamp`)
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function deactivate({ AMId, data }, callback) {
  data = { ...data, assetManagerId: AMId }
  const params = {
    AMaaSClass: 'curve',
    AMId,
    data: JSON.parse(JSON.stringify(data || {}))
  }
  let promise = patchData(params).then(result => {
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
