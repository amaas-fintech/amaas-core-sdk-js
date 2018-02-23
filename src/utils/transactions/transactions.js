import Decimal from 'decimal.js'

import {
  retrieveData,
  insertData,
  patchData,
  putData,
  searchData,
  deleteData
} from '../network'
import { Transaction } from '../../transactions'

/**
 * Retrieve a Transaction from the database
 * @function retrieve
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID of the Transaction's owner
 * @param {string} [params.resourceId] - Transaction ID. Omit to return all Transactions for the supplied AMId
 * @param {string} [params.query] - Optional query to allow version to be specified (`query: { version: 3 }`)
 * @param {function} [callback] - Called with two arguments (error, result) on completion. `result` is an Array of Transactions or a single Transaction instance. Omit to return Promise
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with an Array of Transactions or a single Transaction instance
 */
export function retrieve({ AMId, resourceId, query }, callback) {
  const params = {
    AMaaSClass: 'transactions',
    AMId,
    resourceId,
    query
  }
  let promise = retrieveData(params).then(result => {
    if (Array.isArray(result)) {
      result = result.map(tran => _parseTransaction(tran))
    } else {
      result = _parseTransaction(result)
    }
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

/**
 * Insert a new Transaction into the database
 * @function insert
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - object of parameters:
 * @param {Transaction} params.transaction - Transaction instance or object to insert
 * @param {number} params.AMId - Asset Manager ID of the Transaction's owner
 * @param {function} [callback] - Called with two arguments (error, result) on completion. `result` is the inserted Transaction instance. Omit to return Promise
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with the inserted Transaction instance
 */
export function insert({ AMId, transaction }, callback) {
  let data
  if (transaction) {
    data = JSON.parse(JSON.stringify(transaction))
  }
  const params = {
    AMaaSClass: 'transactions',
    AMId,
    data
  }
  let promise = insertData(params).then(result => {
    result = _parseTransaction(result)
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

/**
 * Amend a Transaction
 * @function amend
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - object of parameters:
 * @param {Transaction} params.transaction - The amended Transaction instance
 * @param {number} params.AMId - Asset Manager ID of the Transaction's owner
 * @param {string} params.resourceId - Transaction ID
 * @param {function} [callback] - Called with two arguments (error, result) on completion. `result` is the amended Transaction instance. Omit to return Promise
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with the amended Transaction instance
 */
export function amend({ transaction, AMId, resourceId }, callback) {
  let data
  if (transaction) {
    data = JSON.parse(JSON.stringify(transaction))
  }
  const params = {
    AMaaSClass: 'transactions',
    AMId,
    resourceId,
    data
  }
  let promise = putData(params).then(result => {
    result = _parseTransaction(result)
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

/**
 * Partially amend a Transaction
 * @function partialAmend
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - object of parameters:
 * @param {Transaction} params.changes - object of changes to apply to the Transaction
 * @param {number} params.AMId - Asset Manager ID of the Transaction's owner
 * @param {string} params.resourceId - Transaction ID
 * @param {function} [callback] - Called with two arguments (error, result) on completion. `result` is the amended Transaction instance. Omit to return Promise
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with the amended Transaction instance
 */
export function partialAmend({ changes, AMId, resourceId }, callback) {
  const params = {
    AMaaSClass: 'transactions',
    AMId,
    resourceId,
    data: changes
  }
  let promise = patchData(params).then(result => {
    result = _parseTransaction(result)
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

/**
 * Search Transactions
 * @function search
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - object of parameters
 * @param {number} [params.AMId] - Asset Manager ID of the Transactions to search over. If omitted you must pass assetManagerIds in the query
 * @param {object} params.query - Search parameters of the form: { `key`: `value` | `[values]` }<br />
 * Available keys are:
 * <li>clientIds</li>
 * <li>transactionStatuses</li>
 * <li>transactionIds</li>
 * <li>assetBookIds</li>
 * <li>counterpartyBookIds</li>
 * <li>assetIds</li>
 * <li>transactionDateStart</li>
 * <li>transactionDateEnd</li>
 * <li>codeTypes</li>
 * <li>codeValues</li>
 * <li>linkTypes</li>
 * <li>linkedTransactionIds</li>
 * <li>partyTypes</li>
 * <li>partyIds</li>
 * <li>referenceTypes</li>
 * <li>referenceValues</li>
 * e.g. `{ assetManagerIds: 1, bookIds: [1, 2, 3] }`
 * @param {function} [callback] - Called with two arguments (error, result) on completion. `result` is an array of Transactions or a single Transaction instance. Omit to return Promise
 * @returns {Promise|null} If no callback supplied, returns a Promise that resolves with an array of Transactions or a single Transaction instance
 */
export function search({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'transactions',
    AMId,
    query
  }
  let promise = searchData(params).then(result => {
    if (Array.isArray(result)) {
      result = result.map(tran => _parseTransaction(tran))
    } else {
      result = _parseTransaction(result)
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
 * Search for Transaction with specified fields
 * @function fieldsSearch
 * @memberof module:api.Positions
 * @static
 * @param {object} query - query object of the form `{ assetManagerIds: number, fields: string[] }`. Any Transaction properties can be passed to `fields`.
 * Note that you may include additional properties in this object corresponding to the available search keys as defined in the `search` function.
 * e.g.`{ assetManagerIds: [1, 2], fields: ['assetId', 'references', 'comments']}`
 * @param {function} callback - Called with two arguments (error, result) on completion. `result` is a plain object or array of plain objects. Omit to return Promise
 * @returns {Promise|null} If no callback supplied, returns a Promise that resolves with a plain object or array of plain objects.
 */
export function fieldsSearch(query, callback) {
  if (!query.assetManagerIds) {
    throw new Error('You must specify at least one Asset Manager ID')
  }
  const params = {
    AMaaSClass: 'transactions',
    query
  }
  let promise = searchData(params).then(result => {
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
 * Cancel a Transaction
 * @function cancel
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID of the Transaction's owner
 * @param {string} params.resourceId - Transaction ID
 * @param {function} [callback] - Called with two arguments (error, result) on completion. `result` is the cancelled Transaction instance. Omit to return Promise
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with the cancelled Transaction instance. Note that this is the only time the API returns a Transaction instance where transactionStatus === 'Cancelled'
 */
export function cancel({ AMId, resourceId }, callback) {
  const params = {
    AMaaSClass: 'transactions',
    AMId,
    resourceId
  }
  let promise = deleteData(params).then(result => {
    result = _parseTransaction(result)
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
 * Upload csv data
 * @function uploadCSV
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - Object of parameters
 * @param {number} params.AMId - Asset Manager ID of the data to upload
 * @param {string} params.data - CSV data
 * @param {string} [params.contentType] - Request content-type
 * @param {function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with the upload summary. Otherwise calls callback (err, result)
 */
export function uploadCSV({ AMId, data, filename, contentType }, callback) {
  let queryParams = {}
  if (filename) {
    queryParams = { ...queryParams, filename: filename }
  }
  const params = {
    AMaaSClass: 'uploadTransactions',
    AMId,
    data,
    contentType: contentType || 'text/csv',
    queryParams
  }
  let promise = insertData(params).then(result => {
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
 * Execute import job for CSV upload
 * @function executeCSVJob
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - Object of parameters
 * @param {number} params.AMId - Asset Manager ID of job owner
 * @param {string} params.importId - Import ID of the upload job (returned by successful call to uploadCSV)
 * @param {function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with import status
 */
export function executeCSVJob({ AMId, importId }, callback) {
  const params = {
    AMaaSClass: 'executeTransactionsUpload',
    AMId,
    resourceId: `${importId}/execute`
  }
  let promise = insertData(params).then(result => {
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
 * List all import jobs for an AMId
 * @function listImportJobs
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - Object of parameters
 * @param {number} params.AMId - Asset Manager ID to retrieve jobs for
 * @param {string} [params.more] - Optional argument for pagination
 * @param {function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with import list
 */
export function listImportJobs({ AMId, more }, callback) {
  const params = {
    AMaaSClass: 'csvImportDetails',
    AMId,
    query: more ? { more } : {}
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

/**
 * Get import job details
 * @function getCSVImportDetails
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - Object of parameters
 * @param {number} params.AMId - Asset Manager ID of job owner
 * @param {string} params.importId
 * @param {function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with import details
 */
export function getCSVImportDetails({ AMId, importId }, callback) {
  const params = {
    AMaaSClass: 'csvImportDetails',
    AMId,
    resourceId: importId
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

/**
 * Get aggregated MTM for specified books
 * @function retrieveAggregateMTM
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - Object of parameters
 * @param {number} params.AMId - Asset Manager ID
 * @param {string | string[]} params.bookIds - Book IDs for which to aggregate MTM
 * @param {string} params.businessDate
 * @param {function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback, returns Promise that resolves with Aggregate MTM data
 */
export function retrieveAggregateMTM(
  { AMId, bookIds = [], businessDate, query },
  callback
) {
  if (bookIds.length === 0 || !businessDate) {
    throw new Error(
      '[AggregateMTM] - both bookIds and businessDate must be supplied'
    )
  }
  let resolvedQuery = {
    bookIds,
    businessDate,
    ...query
  }
  const params = {
    AMaaSClass: 'aggregateMTM',
    AMId,
    query: resolvedQuery
  }
  let promise = retrieveData(params).then(result => {
    if (result) {
      result.aggregateMTM = new Decimal(result.aggregateMTM)
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
 * Get MTM for a particular Book
 * @function retrieveMTM
 * @memberof module:api.Transactions
 * @static
 * @param {object} params - Object of parameters
 * @param {number} params.AMId - Asset Manager ID of MTM owner
 * @param {string} params.bookIds - Book for which to retrieve MTM data
 * @param {string} [params.assetId] - Asset for which to retrieve MTM data. Omit to return MTM for all Assets in Book
 * @param {string} params.date - Date for which to retrieve MTM data
 * @param {string} [params.startDate] - Starting date to retrieve MTM (will return until params.date). Omit to return a single day
 * @param {function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns Promise that resolves with MTM data
 */
export function retrieveMTM(
  { AMId, bookIds, assetIds, date, startDate, query },
  callback
) {
  if (startDate && !date) {
    throw new Error('If startDate is supplied, date must also be supplied')
  }
  let resolvedQuery = {
    bookIds,
    startBusinessDate: startDate || date,
    endBusinessDate: date,
    ...query
  }
  if (assetIds) resolvedQuery = { ...resolvedQuery, assetIds }
  const params = {
    AMaaSClass: 'mtm',
    AMId,
    query: resolvedQuery
  }
  let promise = retrieveData(params).then(result => {
    if (result) {
      if (Array.isArray(result)) {
        result = result.map(res => ({
          ...res,
          mtmValue: new Decimal(res.mtmValue || 0)
        }))
      } else {
        result = { ...result, mtmValue: new Decimal(res.mtmValue || 0) }
      }
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

function _parseTransaction(t) {
  return new Transaction(t)
}
