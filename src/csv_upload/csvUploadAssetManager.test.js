import nock from 'nock'
import {csvUpload } from './indexAssetManager'
import * as funcs from './indexAssetManager'
import * as api from '../exports/api'

describe('csvUpload', () => {
  it('should insert to database', () =>{
  const testParams = {
      AMaaSClass: 'assetManager',
      AMId: '1234',
      csv: 'defaultBookCloseTime, defaultTimezone, assetManagerType, clientId, assetManagerStatus, defaultBookOwnerId'
           +'\n'+'17:30:00, UTC, Accredited Investor, 1, Active, 2'
           +'\n'+'17:30:00, UTC, Accredited Investor, 2, Active, 3'
           +'\n'+'17:30:00, UTC, Accredited Investor, 3, Active, 4'
  }

  const data = [
        {
        defaultBookCloseTime: "17:30:00",
        defaultTimezone: "UTC",
        assetManagerType: "Accredited Investor",
        clientId: 1,
        assetManagerStatus: "Active",
        defaultBookOwnerId: 2
      },

      {
        defaultBookCloseTime: "17:30:00",
        defaultTimezone: "UTC",
        assetManagerType: "Accredited Investor",
        clientId: 2,
        assetManagerStatus: "Active",
        defaultBookOwnerId: 3
      },

      {
        defaultBookCloseTime: "17:30:00",
        defaultTimezone: "UTC",
        assetManagerType: "Accredited Investor",
        clientId: 3,
        assetManagerStatus: "Active",
        defaultBookOwnerId: 4
      }
      ]
   expect(csvUpload(testParams)).toEqual(data);
  /*csvUpload(testParams).then(res =>{
    //expect(res).toEqual(expect.objectContaining(data))
    expect(res).toBe(data);
  }).catch(err => {
    console.error(err)
  })*/
})
  
})