import { retrieveData, insertData, putData } from '../network'
import PositionPNL from '../../transactions/PositionPNL/PositionPNL'

/**
 * @function retrieve
 * @memberof module:api.PositionPNL
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of the Profit and Loss record
 * @param {object} params.query - Object of query params:<br/>
 * Available keys are:
 * <li>`string or string[]` bookIds</li>
 * <li>`string` businessDate</li>
 * <li>`string or string[]` periods</li>
 * <li>`string or string[]` assetIds</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'positionpnl',
    AMId,
    query
  }
  let promise = retrieveData(params).then(result => {
    result = result.map(positionPNL => _parsePositionPNL(positionPNL))
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
 * @memberof module:api.PositionPNL
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of the Profit and Loss record
 * @param {PositionPNL} params.data - PositionPNL object
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function amend({ AMId, data }, callback) {
  const params = {
    AMaaSClass: 'positionpnl',
    data: data,
    AMId
  }
  let promise = putData(params).then(result => {
    result = _parsePositionPNL(result)
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
 * @memberof module:api.PositionPNL
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of the Profit and Loss record
 * @param {PositionPNL} params.data - PositionPNL object
 * @param {object} params.queryParams - Object of query params:<br/>
 * Available keys are:
 * <li>`boolean` upsert</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function insert({ AMId, data, queryParams }, callback) {
  const params = {
    AMaaSClass: 'positionpnl',
    data: data,
    AMId,
    queryParams
  }
  let promise = insertData(params).then(result => {
    result = _parsePositionPNL(result)
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

export function _parsePositionPNL(object) {
  return new PositionPNL(object)
}
