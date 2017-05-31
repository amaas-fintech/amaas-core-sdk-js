import { retrieveData, insertData, patchData, putData, searchData, deleteData } from '../network'
import { Transaction } from '../../transactions'

/**
* Retrieve a Transaction from the database
* @function retrieve
* @memberof module:api.Transactions
* @static
* @param {object} params - object of parameters:
* @param {number} params.AMId - Asset Manager ID of the Transaction's owner
* @param {string} [params.resourceId] - Transaction ID. Omit to return all Transactions for the supplied AMId
* @param {function} [callback] - Called with two arguments (error, result) on completion. `result` is an Array of Transactions or a single Transaction instance. Omit to return Promise
* @returns {Promise|null} If no callback supplied, returns Promise that resolves with an Array of Transactions or a single Transaction instance
*/
export function retrieve({ AMId, resourceId }, callback) {
  const params = {
    AMaaSClass: 'transactions',
    AMId,
    resourceId
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
 * @param {object} params.query - Search parameters of the form: { `key`: `[values]` }<br />
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
 * e.g. `{ assetManagerIds: [1], bookIds: [1, 2, 3] }`
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

function _parseTransaction(t) {
  return new Transaction(t)
}

/**
 * Pull lists of transactions to excel
 * @function exportToExcel
 * @memberof module: api.Transactions
 * @static
 * @param {object} params -Object of parameters:
 * @param {number} params.AMId
 */

export function exportToExcel({AMId, bookId}, callback)
{
   const params ={
     AMId,
     bookId
   }
   //retrieve data from database by AMId/bookId 
  /*var result = [
                 ["Type", "Estimate"],
                 ["Transportation", 1670]
                 ];*/
  var result=retrieve(params, callback);
  //get access to excel 
  var ctx = new exportToExcel.RequestContext();
  Excel.run(function (ctx)
  {
    //create a proxy object for the sheet
    var sheet = ctx.workbook.worksheets.getActiveWorksheet();
    //create a proxy object for the range 
    var range = sheet.getRange("A1:B2");//for example, in fact there are 28 colnums 
    //assign array value to the proxy object's values property 
    range.values=values;
    //Synchronize teh state between Javascript proxy objects and executing instructions queued on the context
    return ctx.syn().then(function(){
      console.log("Done");
    });
  }).catch(function(error){
    console.log("Error: "+error);
    if (error instanceof OfficeExtension.Error){
      console.log("Debug info: "+JSON.stringify(error.debugInfo));
    }
  });
}