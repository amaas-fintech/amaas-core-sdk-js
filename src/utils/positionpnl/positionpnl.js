import {
  retrieveData,
 _parsePositionPNL insertData,
  putData
} from '../network'
import PositionPNL from '../../transactions/PositionPNL/PositionPNL'

export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'positionpnl',
    AMId,
    query
  }
  let promise = retrieveData(params)
    .then(result => {
      result = result.map(positionPNL => _parsePositionPNL(positionPNL))
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

export function insert({ AMId, data, queryParams }, callback) {
  const params = {
    AMaaSClass: 'positionpnl',
    data: data,
    AMId,
    queryParams
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
