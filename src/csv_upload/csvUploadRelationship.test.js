import nock from 'nock'
import {csvUpload } from './indexRelationships'
import * as funcs from './indexRelationships'
import * as api from '../exports/api'

describe('csvUpload', () => {
  it('should insert to database', () =>{
  const testParams = {
      AMaaSClass: 'relationship',
      AMId: '1234',
      csv: 'assetManagerId, relationshipId, relatedId, relationshipType'
      +'\n'+'1, 1234, 10, External'
  }
  
  const rel =[ {
        assetManagerId: 1,
        relationshipType: "External",
        relatedId: 10,
        relationshipId: 1234
      }]

   expect(csvUpload(testParams)).toEqual(rel);   

  /*csvUpload(testParams).then(res =>{
    expect(res).toEqual(expect.objectContaining(csv))
  }).catch(err => {
    console.error(err)
  })*/
})
  
})