/**
 * API Methods. These methods enable communication with the AMaaS Database. All methods return Promises with the option to use callbacks instead. Specific implementation instructions are detailed below.
 * @module api
 */

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
  const {
    stage, apiURL, apiVersion,
    credentialsPath,
    token, cognitoPoolId, cognitoClientId,
  } = config
  configureStage({ stage, credentialsPath, apiVersion, apiURL })
  configureAuth({ token, cognitoPoolId, cognitoClientId })
}
