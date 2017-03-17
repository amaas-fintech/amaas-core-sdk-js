// import { baseURL } from './constants.js'
// import * as types from '../../core/types.js'
import ENDPOINTS from '../../config.js'

import request from 'superagent'
require('dotenv').config()

/***
 * !This is an internal function that should not be called by the end user!

 * Builds a URL for HTTP request
 * @param {object} anonymous: anonyous object with arguments:
 * @param {string} type: type of HTTP request (GET, POST, etc). Used for validation of parameters
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} resourceId: Id of the resource being requested (e.g. book_id)
*/
export function buildURL({ AMaaSClass, AMId, resourceId }) {
  let baseURL;
  switch (AMaaSClass) {
    case 'book':
      // baseURL = process.env.booksURL
      baseURL = `${ENDPOINTS.books}/books`
      break
    case 'parties':
      // baseURL = process.env.partiesURL
      baseURL = `${ENDPOINTS.parties}/parties`
      break
    case 'assetManagers':
      baseURL = `${ENDPOINTS.assetManagers}/asset_managers`
      break
    case 'assets':
      baseURL = `${ENDPOINTS.assets}/assets`
      break
    case 'positions':
      baseURL = `${ENDPOINTS.transactions}/positions`
      break
    default:
      // baseURL = process.env.booksURL
      baseURL = `${ENDPOINTS.books}/books`
  }
  if (!AMaaSClass) {
    throw new Error('Class is required to build URL')
  } else if (!AMId) {
    return `${baseURL}/`
  } else if (!resourceId) {
    return `${baseURL}/${AMId}`
  } else {
    return `${baseURL}/${AMId}/${resourceId}`
  }
}

/***
 * !This is an internal function that should not be called by the end user!
 * !Wrapper functions are exposed for the individual asset classes for consumption!

 * Base function for retrieval of data from the database (GET request)
 * @param {object} anonymous: anonymous object with arguments:
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} resourceId: Id of the resource being requested (e.g. book_id)
*/
export function retrieveData({ AMaaSClass, AMId, resourceId }, token, callback) {
  // callback(err, result)
  // Class and AMId needed to build the Url and for authorization
  if (!AMaaSClass || !AMId) {
    throw new Error('Both class and AMId are required')
  }
  // If resourceId is supplied, append to url. Otherwise, return all data for AMId
  const url = buildURL({ AMaaSClass, AMId, resourceId })
  // const url = resourceId ? `${baseURL}${AMaaSClass}/${AMId}/${resourceId}` : `${baseURL}${AMaaSClass}/${AMId}/`

  request.get(url).set('Authorization', token).end((error, response) => {

    if (!error && response.status == 200) {
      callback(null, response.body)
    } else {
      const statusCode = response ? response.status : ''
      const requestError = {
        statusCode,
        error
      }
      callback(requestError)
    }
  })
}

/***
 * !This is an internal function that should not be called by the end user!
 * !Wrapper functions are exposed for the individual asset classes for consumption!

 * Base function for insertion of data to the database (POST request)
 * @param {object} anonymous: anonymous object with arguments:
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} data: data to insert into database
*/
export function insertData({ AMaaSClass, AMId, data }, token, callback) {
  // if (!AMaaSClass || !AMId || !data) {
  //   throw new Error('Class, AMId and data to insert are required')
  // }
  const url = buildURL({
    AMaaSClass,
    AMId
  })
  // Data is object with required key value pairs for that class
  // const am = 'asset_manager_id'
  // data[am] = AMId
  const params = {
    url,
    json: data
  }
  request.post(url).send(data).set('Authorization', token).end((error, response) => {
    _networkCallback(error, response, response.body, callback)
  })
}

export function putData({ AMaaSClass, AMId, resourceId, data }, token, callback) {
  const url = buildURL({
    AMaaSClass,
    AMId,
    resourceId
  })
  const params = {
    url,
    json: data
  }
  request.put(url).send(data).set('Authorization', token).end((error, response) => {
    _networkCallback(error, response, response.body, callback)
  })
}

export function patchData({ AMaaSClass, AMId, resourceId, data }, token, callback) {
  const url = buildURL({
    AMaaSClass,
    AMId,
    resourceId
  })
  const params = {
    url,
    json: data
  }
  request.patch(url).send(data).set('Authorization', token).end((error, response) => {
    _networkCallback(error, response, response.body, callback)
  })
}

export function deleteData({ AMaaSClass, AMId, resourceId }, token, callback) {
  const url = buildURL({
    AMaaSClass,
    AMId,
    resourceId
  })
  request.delete(url).set('Authorization', token).end((error, response) => {
    _networkCallback(error, response, response.body, callback)
  })
}

export function searchData({ AMaaSClass, queryKey, queryValue }, token, callback) {
  const url = buildURL({
    AMaaSClass
  })
  let qString = {}
  const qValueString = queryValue.join()
  qString[queryKey] = qValueString
  const params = {
    url,
    qs: qString
  }
  request.get(url).set('Authorization', token).query(qString).end((error, response) => {
    _networkCallback(error, response, response.body, callback)
  })
}

function _networkCallback(error, response, body, callback) {
  if (!error && response.status === 200) {
    callback(null, body)
  } else if (error) {
    callback(error)
  } else {
    callback({ response, body })
  }
}
