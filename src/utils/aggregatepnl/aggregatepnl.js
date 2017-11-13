import { retrieveData } from '../network'

export function retrieve({ AMId }, callback) {
  const params = {
    AMaaSClass: 'aggregatepnl',
    AMId
  }
  let promise = retrieveData(params)
    .then(result => {
      if (typeof callback === 'function') {
        callback(null, result)
      }
      return result
    })
    if (typeof callback === 'function') {
      return promise
    }
}
