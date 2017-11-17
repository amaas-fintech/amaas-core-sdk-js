import {
  retrieveData,
  insertData,
  putData
} from '../network'
import TransactionPNL from '../../transactions/TransactionPNL/TransactionPNL'

export function retrieve({ AMId }, callback) {
  const params = {
    AMaaSClass: 'transationpnl',
    AMId,
    bookId,
    businessDate
  }
  let promise = retrieveData(params)
    .then(result => {
      result = result.map(transationpnl => _parseTransactoinPNL(pnl))
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback !== 'function') {
      return promise
    }
}

export function amend({ AMId, data }, callback) {
  const params = {
    AMaaSClass: 'transationpnl',
    data: data,
    AMId,
    upsert
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

export function insert({ AMId, data }, callback) {
  const params = {
    AMaaSClass: 'transationpnl',
    data: data,
    AMId,
    upsert
  }
  let promise = insertData(params)
    .then(result => {
      result = _parseTransactionPNL(result)
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback !== 'function') {
      return promise
    }
}

export function _ParseTransactionPNL(object) {
  return new TransactionPNL(object)
}
