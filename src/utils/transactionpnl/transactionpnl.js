import { retrieveData, insertData, putData } from '../network'
import TransactionPNL from '../../transactions/TransactionPNL/TransactionPNL'

/**
 * @function retrieve
 * @memberof module:api.TransactionPNL
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
export function retrieve({ AMId, query = {} }, callback) {
  const params = {
    AMaaSClass: 'transactionpnl',
    AMId,
    query: { combinePeriods: true, ...query }
  }
  let promise = retrieveData(params).then(result => {
    // if combinePeriods is not supplied, or supplied as true,
    // parse to class (otherwise just pass json as-is for now)
    if (!('combinePeriods' in query) || query.combinePeriods === true) {
      result = result.map(transactionPNL =>
        _parseTransactionPNL(transactionPNL)
      )
    }
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
 * @memberof module:api.TransactionPNL
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of the Profit and Loss record
 * @param {TransactionPNL} params.data - TransactionPNL object
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function amend({ AMId, data, queryParams }, callback) {
  const params = {
    AMaaSClass: 'transactionpnl',
    data: data,
    AMId,
    queryParams
  }
  let promise = putData(params).then(result => {
    result = _parseTransactionPNL(result)
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
 * @memberof module:api.TransactionPNL
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Owning Asset Manager ID of the Profit and Loss record
 * @param {TransactionPNL} params.data - TransactionPNL object
 * @param {object} params.queryParams - Object of query params:<br/>
 * Available keys are:
 * <li>`boolean` upsert</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function insert({ AMId, data, queryParams }, callback) {
  const params = {
    AMaaSClass: 'transactionpnl',
    data: data,
    AMId,
    queryParams
  }
  let promise = insertData(params).then(result => {
    result = _parseTransactionPNL(result)
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

export function _parseTransactionPNL(object) {
  return new TransactionPNL(object)
}
