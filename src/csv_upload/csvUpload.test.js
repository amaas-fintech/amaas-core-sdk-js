import nock from 'nock'
import {
  buildURL,
  retrieveData,
  insertData,
  searchData,
  putData,
  patchData,
  deleteData,
  getEndpoint
} from '../utils/network/index'
import {csvUpload } from './'
import * as funcs from './'
import * as api from '../exports/api'

api.config({
  stage: 'staging',
  token: process.env.API_TOKEN
})

describe('csvUpload', () => {
  afterAll(() =>{
    nock.cleanAll()
  })
  const testParams = {
      AMaaSClass: 'book',
      AMId: '1234',
      csv: 'description, bookType, businessUnit, partyId, closeTime, timezone, assetManagerId, ownerId, baseCurrency,'
           +'\n'+'RRN4WVXI1F3YA1IGMKZF, null, A1UNKOYGGR, 18:00:00, Asia/Tokyo, 1, 50SJMSPK7A, USD'
  }

  it('should upload csv data to correct url', function(done) {
 
      const scope = nock(getEndpoint())
      .post('/book/books/1234?camelcase=true') ///book/books/1234/testResource?camelcase=true
      .reply(200, {
        param1: 'testResponsse'
      })
   
     csvUpload(testParams, (error, result) => {
     expect(result).toEqual({ param1: 'testResponse' }) 
     done()

    })
    
    })

  it('should return a promise if callback is not provided', function() {
    let promise = csvUpload(testParams).catch(error => {})
    expect(promise).toBeInstanceOf(Promise)
  })
})
