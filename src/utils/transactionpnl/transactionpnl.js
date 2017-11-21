import { retrieveData, insertData, putData } from '../network'
import TransactionPNL from '../../transactions/TransactionPNL/TransactionPNL'

export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'transationpnl',
    AMId,
    query
  }
  let promise = retrieveData(params).then(result => {
    result = result.map(transationPNL => _parseTransactoinPNL(transationPNL))
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

export function amend({ AMId, data, queryParams }, callback) {
  const params = {
    AMaaSClass: 'transationpnl',
    data: data,
    AMId,
    queryParams
  }
  let promise = putData(params).then(result => {
    result = _ParseTransactionPNL(result)
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

export function insert({ AMId, data, queryParams }, callback) {
  const params = {
    AMaaSClass: 'transationpnl',
    data: data,
    AMId,
    queryParams
  }
  let promise = insertData(params).then(result => {
    result = _ParseTransactionPNL(result)
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

export function _ParseTransactionPNL(object) {
  return new TransactionPNL(object)
}
