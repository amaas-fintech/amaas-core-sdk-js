import nock from 'nock'
import {csvUpload } from './indexAsset'
import * as funcs from './indexAsset'
import * as api from '../exports/api'

describe('csvUpload', () => {
  it('should insert to database', () =>{
  const testParams = {
      AMaaSClass: 'asset',
      AMId: '1',
      csv: 'description, assetType, assetManagerId, assetId'+'\n'+'testAsset, Equity, 1, 1234'
  }

  const asset = [
      {
        description: 'testAsset',
        assetType: 'Equity',
        assetManagerId: 1,
        assetId: 1234
      }
  ]
  expect(csvUpload(testParams)).toEqual(asset)
  /*csvUpload(testParams).then(res =>{
    expect(res).toBe(asset);
  }).catch(err => {
    console.error(err)
  })*/
})
  
})
