import request from 'superagent'
import { endpoint, userPoolConfig } from '../../config.js'
import fs from 'fs'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from 'amazon-cognito-identity-js'
import expandTilde from 'expand-tilde'

export function poolConfig(stage) {
  return userPoolConfig[stage]
}

const userPool = stage =>
  new CognitoUserPool({
    UserPoolId: poolConfig(stage).userPoolId,
    ClientId: poolConfig(stage).clientAppId
  })

export function getEndpoint({ stage, apiVersion }) {
  return `${endpoint[stage]}/${apiVersion}`
}

function isNode() {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]'
  } catch (e) {
    return false
  }
}

export function authenticate(stage, credPath) {
  let injectedResolve
  let injectedReject
  return new Promise((resolve, reject) => {
    injectedResolve = resolve
    injectedReject = reject
    let path
    if (credPath) {
      path = credPath
    } else {
      path = `${expandTilde('~')}/amaas.js`
    }
    console.log(`Reading credentials from ${path}`)
    fs.readFile(path, (error, data) => {
      if (error) {
        return injectedReject(error)
      }
      const Username = JSON.parse(data).username
      const Password = JSON.parse(data).password
      const authenticationDetails = new AuthenticationDetails({
        Username,
        Password
      })
      const cognitoUser = new CognitoUser({
        Username,
        Pool: userPool(stage)
      })
      console.log('Starting authentication...')
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: res => injectedResolve(res.getIdToken().getJwtToken()),
        onFailure: err => injectedReject(err)
      })
    })
  })
}

export function getToken(stage, credPath) {
  // token injection
  // if (token && token.length > 0) {
  //   return Promise.resolve(token)
  // }
  let injectedResolve
  let injectedReject
  return new Promise((resolve, reject) => {
    injectedResolve = resolve
    injectedReject = reject
    const cognitoUser = userPool(stage).getCurrentUser()
    if (!cognitoUser) {
      if (isNode()) {
        console.warn('No user in storage, attempting to authenticate...')
        authenticate(stage, credPath)
          .then(res => injectedResolve(res))
          .catch(err => injectedReject(err))
      } else {
        injectedReject('Unauthorized, please re-authenticate')
      }
    } else {
      cognitoUser.getSession((err, session) => {
        if (session) {
          console.log('getSession success')
          injectedResolve(session.getIdToken().getJwtToken())
        } else {
          if (isNode()) {
            console.warn('getSession failure, attempting to authenticate')
            authenticate(stage, credPath)
              .then(res => injectedResolve(res))
              .catch(err => injectedReject(err))
          } else {
            injectedReject('Unauthorized, please re-authenticate')
          }
        }
      })
    }
  })
}

/***
 * !This is an internal function that should not be called by the end user!

 * Builds a URL for HTTP request
 * @param {object} anonymous: anonyous object with arguments:
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} resourceId: Id of the resource being requested (e.g. book_id)
*/
export function buildURL({ AMaaSClass, AMId, resourceId, stage, apiVersion }) {
  let baseURL = ''
  switch (AMaaSClass) {
    case 'assets':
      baseURL = `${getEndpoint({ stage, apiVersion })}/asset/assets`
      break
    case 'assetConfig':
      baseURL = `${getEndpoint({ stage, apiVersion })}/asset/asset-config`
      break
    case 'assetManagers':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/assetmanager/asset-managers`
      break
    case 'assetManagerDomains':
      baseURL = `${getEndpoint({ stage, apiVersion })}/assetmanager/domains`
      break
    case 'assetManagerEODBooks':
      baseURL = `${getEndpoint({ stage, apiVersion })}/assetmanager/eod-books`
      break
    case 'assetManagerPubSubCredentials':
      baseURL = `${getEndpoint({ stage, apiVersion })}/book/credentials`
      break
    case 'book':
      baseURL = `${getEndpoint({ stage, apiVersion })}/book/books`
      break
    case 'bookPermissions':
      baseURL = `${getEndpoint({ stage, apiVersion })}/book/book-permissions`
      break
    case 'parties':
      baseURL = `${getEndpoint({ stage, apiVersion })}/party/parties`
      break
    case 'positions':
      baseURL = `${getEndpoint({ stage, apiVersion })}/transaction/positions`
      break
    case 'allocations':
      baseURL = `${getEndpoint({ stage, apiVersion })}/transaction/allocations`
      break
    case 'uploadTransactions':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/transaction/imports`
      break
    case 'executeTransactionsUpload':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/transaction/import`
      break
    case 'csvImportDetails':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/transaction/imports`
      break
    case 'monitorItems':
      baseURL = `${getEndpoint({ stage, apiVersion })}/monitor/items`
      break
    case 'monitorActivities':
      baseURL = `${getEndpoint({ stage, apiVersion })}/monitor/activities`
      break
    case 'monitorEvents':
      baseURL = `${getEndpoint({ stage, apiVersion })}/monitor/events`
      break
    case 'netting':
      baseURL = `${getEndpoint({ stage, apiVersion })}/transaction/netting`
      break
    case 'relationships':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/assetmanager/asset-manager-relationships`
      break
    case 'relatedAssetManagerID':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/assetmanager/asset-manager-related-amid`
      break
    case 'relationshipRequest':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/assetmanager/relationship-request`
      break
    case 'transactions':
      baseURL = `${getEndpoint({ stage, apiVersion })}/transaction/transactions`
      break
    case 'corporateActions':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/corporateaction/corporate-actions`
      break
    case 'fundamentalCountries':
      baseURL = `${getEndpoint({ stage, apiVersion })}/fundamental/countries`
      break
    case 'fundamentalBusinessDate':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/fundamental/business-date`
      break
    case 'fundamentalDateInfo':
      baseURL = `${getEndpoint({ stage, apiVersion })}/fundamental/date-info/`
      break
    case 'fundamentalHoliday':
      baseURL = `${getEndpoint({ stage, apiVersion })}/fundamental/holidays`
      break
    case 'positionpnl':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/transaction/position_pnls`
      break
    case 'transactionpnl':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/transaction/transaction_pnls`
      break
    case 'aggregatepnl':
      baseURL = `${getEndpoint({
        stage,
        apiVersion
      })}/transaction/aggregate_pnls`
      break
    default:
      throw new Error(`Invalid class type: ${AMaaSClass}`)
  }
  if (AMId === null || AMId === undefined) {
    return `${baseURL}`
  } else if (!resourceId) {
    return `${baseURL}/${AMId}`
  } else {
    return `${baseURL}/${AMId}/${resourceId}`
  }
}

export function setAuthorization(stage) {
  return 'Authorization'
}

export function makeRequest({
  method,
  url,
  data,
  query,
  stage,
  credPath,
  contentType
}) {
  return getToken(stage, credPath)
    .then(res => {
      let requestToMake
      switch (method) {
        case 'GET':
          requestToMake = request.get(url).query({ ...query, camelcase: true })
          break
        case 'SEARCH':
          requestToMake = request.get(url).query({ ...data, camelcase: true })
          break
        case 'POST':
          requestToMake = request
            .post(url)
            .send(data)
            .query({ ...query, camelcase: true })
          break
        case 'PUT':
          requestToMake = request
            .put(url)
            .send(data)
            .query({ ...query, camelcase: true })
          break
        case 'PATCH':
          requestToMake = request
            .patch(url)
            .send(data)
            .query({ ...query, camelcase: true })
          break
        case 'DELETE':
          requestToMake = request
            .delete(url)
            .query({ ...query, camelcase: true })
          break
        default:
      }
      if (contentType) {
        requestToMake = requestToMake.type(contentType)
      }
      return requestToMake.set(setAuthorization(stage), res)
    })
    .catch(err => Promise.reject(err))
}
