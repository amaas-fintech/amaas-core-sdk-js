import {
  retrieveData,
  insertData,
  putData
} from '../network'
import PositionPNL from '../../transactions/PostionPNL/PositionPNL'

export function retrieve({ AMId }, callback) {
  const params = {
    AMaaSClass: 'positionpnl',
    AMId
  }
  let promise = retrieveData(params)
    .then(result => {
      result = result.map(positionpnl => _parsePositionPNL(pnl))
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

export function insert({ AMId, data }, callback) {
  const params = {
    AMaaSClass: 'positionpnl',
    data: data,
    AMId
  }
  let promise = insertData(params)
    .then(result => {
      result = _parsePositionPNL(result)
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback !== 'function') {
      return promise
    }
}

export function _parsePositionPNL(object) {
  return new PositionPNL(object)
}
