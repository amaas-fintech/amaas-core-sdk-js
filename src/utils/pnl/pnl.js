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

export function _parsePNLResult(object) {
  return new PNLResult(object)
}
