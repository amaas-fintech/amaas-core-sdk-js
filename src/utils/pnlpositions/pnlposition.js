import {
  retrieveData,
  insertData,
  putData
} from '../network'
import PNLPosition from '../../transactions/PostionPNL/PositionPNL'


export function retrieve({ AMId }, callback) {
  const params = {
    AMaaSClass: 'pnlposition',
    AMId
  }
  let promise = retrieveData(params)
    .then(result => {
      result = result.map(pnlposition => _parsePNLPosition(pnl))
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback !== 'function') {
      return promise
    }
}

export function amend({ AMId }, callback) {
  const params = {
    AMaaSClass: 'pnlposition',
    AMId
  }
  let promise = putData(params).then(result => {
    result = _parseParty(result)
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    return promise
  }
  promiswe.catch(error => callback(error))
}

export function insert({ AMId }, callback) {
  const params = {
    AMaaSClass: 'pnlposition',
    AMId
  }
  let promise = insertData(params)
    .then(result => {
      result = _parsePNLPosition(result)
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback !== 'function') {
      return promise
    }
}

export function _parsePNLPosition(object) {
  return new PNLPosition(object)
}
