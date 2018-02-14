/**
 * API Methods. These methods enable communication with the AMaaS Database. All methods return Promises with the option to use callbacks instead. Specific implementation instructions are detailed below.
 * @module api
 */
import fs from 'fs'
import expandTilde from 'expand-tilde'

import * as Allocations from '../utils/allocations'
import * as AssetManagers from '../utils/assetManagers'
import * as Assets from '../utils/assets'
import * as Books from '../utils/books'
import * as CorporateActions from '../utils/corporateActions'
import * as Fundamentals from '../utils/fundamentals'
import * as Monitor from '../utils/monitor'
import * as Netting from '../utils/netting'
import * as Parties from '../utils/parties'
import * as Positions from '../utils/positions'
import * as Relationships from '../utils/relationships'
import * as Transactions from '../utils/transactions'
import * as csv from '../csv_upload/csvUpload.js'
import * as PositionPNL from '../utils/positionpnl/positionpnl'
import * as TransactionPNL from '../utils/transactionpnl/transactionpnl'
import * as AggregatePNL from '../utils/aggregatepnl/aggregatepnl'
import * as Curve from '../utils/curve/curve'
import * as ForwardRate from '../utils/forwardrate/forwardrate'
import * as FXRate from '../utils/fxrate/fxrate'
import * as EOD from '../utils/eod/eod'

import { configureStage, configureAuth } from '../utils/network'

export {
  Allocations,
  AssetManagers,
  Assets,
  Books,
  CorporateActions,
  Fundamentals,
  Monitor,
  Parties,
  Positions,
  Relationships,
  Transactions,
  csv,
  config,
  PositionPNL,
  TransactionPNL,
  AggregatePNL,
  Curve,
  ForwardRate,
  FXRate,
  EOD
}

function config(config) {
  let {
    credentialsPath,
    stage,
    apiURL,
    apiVersion,
    cognitoPoolId,
    cognitoClientId,
    token,
    username,
    password
  } = config

  if (isNode()) {
    let fc = loadFileConfig(credentialsPath)
    if (!stage) stage = fc.stage
    if (!apiURL) apiURL = fc.apiURL
    if (!apiVersion) apiVersion = fc.apiVersion
    if (!cognitoPoolId) cognitoPoolId = fc.cognitoPoolId
    if (!cognitoClientId) cognitoClientId = fc.cognitoClientId
    if (!token) token = fc.token
    if (!username) username = fc.username
    if (!password) password = fc.password
  }

  configureStage({ stage, apiVersion, apiURL })
  configureAuth({ cognitoPoolId, cognitoClientId, token, username, password })
}

function isNode() {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]'
  } catch (e) {
    return false
  }
}

function loadFileConfig(credPath) {
  if (process.env.NODE_ENV === 'test') return {}
  let path
  if (credPath) {
    path = credPath
  } else {
    path = `${expandTilde('~')}/amaas.js`
  }
  try {
    fs.accessSync(path)
  } catch (err) {
    // File does not exist
    return {}
  }
  console.log(`Reading credentials from ${path}`)
  let data = fs.readFileSync(path)
  return JSON.parse(data)
}
