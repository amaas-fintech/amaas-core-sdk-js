import nock from 'nock'
import {csvUpload } from './indexBook'
import * as funcs from './indexBook'
import * as api from '../exports/api'

describe('csvUpload', () => {
  it('should insert to database', () =>{
  const testParams = {
      AMaaSClass: 'book',
      AMId: '1234',
      csv: 'description, bookType, businessUnit, partyId, closeTime, timezone, assetManagerId, ownerId, baseCurrency'
      +'\n'+'RRN4WVXI1F3YA1IGMKZF, Trading, TestUnit, A1UNKOYGGR, 18:00:00, Asia/Tokyo, '+1+', 50SJMSPK7A, USD'
  }

  const data =[ {
        description: "RRN4WVXI1F3YA1IGMKZF",
        bookType: "Trading",
        businessUnit: "TestUnit",
        partyId: "A1UNKOYGGR",
        closeTime: "18:00:00",
        timezone: "Asia/Tokyo",
        assetManagerId: 1,
        ownerId: "50SJMSPK7A",
        baseCurrency: "USD",
      }
      ]
  
  //csvUpload(testParams).then(res =>{
    expect(csvUpload(testParams)).toEqual(data); 
  /*}).catch(err => {
    console.error(err)
  })*/
})
  
})
