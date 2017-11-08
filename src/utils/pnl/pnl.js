import {
  retrieveData,
  insertData,
  putData
} from '../network'
import PNLResult from '../../transactions/PNLResult/PNLResult'

export function retrieve({ AMId, resourceId }, callback) {
  const params = {
    AMaaSClass: 'pnl',
    AMId
  }
  let promise = retrieveData(params)
    .then(result => {
      if (Array.isArray(result)) {
        result = result.map(pnl => _parsePNLResult(pnl))
      } else {
        result = _parsePNLResult(result)
      }
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback !== 'function') {
    return promise
    }
    promise.catch(error => calback(error))
}

export function insert({ AMId, pnl}, callback) {
  const params = {
    AMaaSClass: 'pnl',
    AMId
  }
  let promise = insertData(params)
    .then(result => {
      result = _parsePNLResult(result)
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback !== 'function') {
      return promise
    }
}

export function amend({  AMId, pnl }, callback) {
  stringified, data
  if (pnl) {
    stringified = JSON.stringify(pnl)
    data = JSON.parse(stringified)
  }
  const params = {
    AMaaSClass: 'pnl',
    AMId,
    data
  }
  let promise = putData(params).then(result => {
    result = _parseParty(result)
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

export function _parsePNLResult(object) {
  return new PNLResult(object)
}
