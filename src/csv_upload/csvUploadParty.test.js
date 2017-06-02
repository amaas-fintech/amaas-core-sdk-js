import nock from 'nock'
import {csvUpload } from './indexParty'
import * as funcs from './indexParty'
import * as api from '../exports/api'

describe('csvUpload', () => {
  it('should insert to database', () =>{
  const testParams = {
      AMaaSClass: 'party',
      AMId: '1234',
      csv: 'description, partyType, assetManagerId, partyId'+'\n'+'testParty, Broker, 516, 1234'
  }
  const party =[ {
        description: "testParty",
        partyType: "Broker",
        assetManagerId: 516,
        partyId: 1234
  }]
  expect(csvUpload(testParams)).toEqual(party)
  /*csvUpload(testParams).then(res =>{
    expect(res).toEqual(expect.objectContaining(testParams))
  }).catch(err => {
    console.error(err)
  })*/
})
  
})
