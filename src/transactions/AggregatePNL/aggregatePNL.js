import Decimal from 'decimal.js'
import mapValues from 'lodash/mapValues'

import { AMaaSModel } from '../../core'

/**
 * Class representing Aggregate Profit and Loss
 * @memberof module:transactions
 * @extends module:core.AMaaSModel
 */
class AggregatePNL extends AMaaSModel {
  constructor({
    YTD,
    MTD,
    DTD,
    fxRates,
    createdBy,
    updatedBy,
    createdTime,
    updatedTime,
    version
  }) {
    super({
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
    Object.defineProperties(this, {
      _YTD: { writable: true, enumerable: false },
      YTD: {
        get: () => this._YTD,
        set: (newYTD = {}) => {
          let { total, fx, asset } = newYTD
          total = new Decimal(total || 0)
          fx = new Decimal(fx || 0)
          asset = new Decimal(asset || 0)
          this._YTD = { total, fx, asset }
        },
        enumerable: true
      },
      _MTD: { writable: true, enumerable: false },
      MTD: {
        get: () => this._MTD,
        set: (newMTD = {}) => {
          let { total, fx, asset } = newMTD
          total = new Decimal(total || 0)
          fx = new Decimal(fx || 0)
          asset = new Decimal(asset || 0)
          this._MTD = { total, fx, asset }
        },
        enumerable: true
      },
      _DTD: { writable: true, enumerable: false },
      DTD: {
        get: () => this._DTD,
        set: (newDTD = {}) => {
          let { total, fx, asset } = newDTD
          total = new Decimal(total || 0)
          fx = new Decimal(fx || 0)
          asset = new Decimal(asset || 0)
          this._DTD = { total, fx, asset }
        },
        enumerable: true
      },
      _fxRates: { writable: true, enumerable: false },
      fxRates: {
        get: () => this._fxRates,
        set: (newFxRates = {}) => {
          let castFxRates = mapValues(
            newFxRates,
            rate => new Decimal(rate || 0)
          )
          this._fxRates = castFxRates
        },
        enumerable: true
      }
    })

    this.YTD = YTD
    this.MTD = MTD
    this.DTD = DTD
    this.fxRates = fxRates
  }
}

export default AggregatePNL
