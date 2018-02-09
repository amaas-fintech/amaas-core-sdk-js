import request from 'superagent'
import { endpoint, userPoolConfig } from '../../config.js'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from 'amazon-cognito-identity-js'


export function getCognitoPool({ stage, cognitoPoolId, cognitoClientId }) {
  // Legacy configurations
  if (stage in userPoolConfig) {
    return new CognitoUserPool({
      UserPoolId: userPoolConfig[stage].userPoolId,
      ClientId: userPoolConfig[stage].clientAppId,
    })
  }
  // Otherwise build
  return new CognitoUserPool({
    UserPoolId: cognitoPoolId,
    ClientId: cognitoClientId,
  })
}

export function getEndpoint({ stage, apiVersion, apiURL }) {
  // Legacy configurations
  if (stage in endpoint) {
    apiVersion = apiVersion ? apiVersion : 'v1.0'
    return `${endpoint[stage]}/${apiVersion}`
  }
  // Otherwise, build
  if (apiURL) {
    return apiURL
  } else if (stage) {
    return `https://api-${stage}.dev.amaas.com/`
  } else {
    return 'https://api.amaas.com/'
  }
}

export function authenticate({ stage, username, password, cognitoPoolId, cognitoClientId }) {
  let injectedResolve
  let injectedReject
  return new Promise((resolve, reject) => {
    injectedResolve = resolve
    injectedReject = reject
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    })
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: getCognitoPool({stage, cognitoPoolId, cognitoClientId})
    })
    console.log('Starting authentication...')
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: res => injectedResolve(res.getIdToken().getJwtToken()),
      onFailure: err => injectedReject(err)
    })
  })
}

export function getToken({ stage, cognitoPoolId, cognitoClientId, username, password }) {
  // token injection
  // if (token && token.length > 0) {
  //   return Promise.resolve(token)
  // }
  let injectedResolve
  let injectedReject
  return new Promise((resolve, reject) => {
    injectedResolve = resolve
    injectedReject = reject
    const cognitoUser = getCognitoPool(
      {stage, cognitoPoolId, cognitoClientId}
    ).getCurrentUser()
    if (!cognitoUser) {
      if (username && password) {
        console.warn('No user in storage, attempting to authenticate...')
        authenticate({stage, username, password, cognitoPoolId, cognitoClientId})
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
          if (username && password) {
            console.warn('getSession failure, attempting to authenticate')
            authenticate({stage, username, password, cognitoPoolId, cognitoClientId})
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

const PATH_MAP = {
  'assets': '/asset/assets',
  'assetConfig': '/asset/asset-config',
  'assetManagers': '/assetmanager/asset-managers',
  'assetManagerDomains': '/assetmanager/domains',
  'assetManagerEODBooks': '/assetmanager/eod-books',
  'assetManagerPubSubCredentials': '/book/credentials',
  'book': '/book/books',
  'bookPermissions': '/book/book-permissions',
  'parties': '/party/parties',
  'positions': '/transaction/positions',
  'allocations': '/transaction/allocations',
  'uploadTransactions': '/transaction/imports',
  'executeTransactionsUpload': '/transaction/imports',
  'csvImportDetails': '/transaction/imports',
  'mtm': '/transaction/mtm',
  'monitorItems': '/monitor/items',
  'monitorActivities': '/monitor/activities',
  'monitorEvents': '/monitor/events',
  'netting': '/transaction/netting',
  'relationships': '/assetmanager/asset-manager-relationships',
  'relatedAssetManagerID': '/assetmanager/asset-manager-related-amid',
  'relationshipRequest': '/assetmanager/relationship-request',
  'transactions': '/transaction/transactions',
  'corporateActions': '/corporateaction/corporate-actions',
  'fundamentalCountries': '/fundamental/countries',
  'fundamentalBusinessDate': '/fundamental/business-date',
  'fundamentalDateInfo': '/fundamental/date-info/',
  'fundamentalHoliday': '/fundamental/holidays',
  'positionpnl': '/transaction/position_pnls',
  'transactionpnl': '/transaction/transaction_pnls',
  'aggregatepnl': '/transaction/aggregate_pnls',
  'eod': '/marketdata/eod-prices',
  'eodBatch': '/eod/batches',
  'curve': '/marketdata/curves',
  'fxRate': '/marketdata/fx-rates',
  'forwardRate': '/marketdata/forward-rates',
}

/***
 * !This is an internal function that should not be called by the end user!

 * Builds a URL for HTTP request
 * @param {object} anonymous: anonyous object with arguments:
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} resourceId: Id of the resource being requested (e.g. book_id)
*/
export function buildURL({ AMaaSClass, AMId, resourceId, stage, apiVersion, apiURL }) {
  let base = `${getEndpoint({ stage, apiVersion, apiURL })}`.replace(/\/$/, '')
  if (!(AMaaSClass in PATH_MAP)) {
      throw new Error(`Invalid class type: ${AMaaSClass}`)
  }
  return [base, PATH_MAP[AMaaSClass], AMId, resourceId].reduce((url, part) => {
    if (part != null) {
      part = part.toString().replace(/^\/|\/$/g, '')
      return `${url}/${part}`
    } else {
      return url
    }
  })
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
  cognitoPoolId, cognitoClientId,
  username, password,
  contentType
}) {
  return getToken({stage, cognitoPoolId, cognitoClientId, username, password})
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
