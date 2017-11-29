import { retrieveData } from '../network'

export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'aggregatepnl',
    AMId,
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
