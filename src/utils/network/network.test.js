import * as network from './'
import * as utils from './utils'
import * as api from '../../exports/api'

utils.buildURL = jest.fn()
utils.makeRequest = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieveData', () => {
  beforeAll(() => {
    utils.buildURL.mockImplementation(() => 'testURL')
    utils.makeRequest.mockImplementation(() =>
      Promise.resolve({ body: 'testBody' })
    )
  })
  afterAll(() => {
    api.config({ stage: 'staging', apiVersion: 'v1.0' })
  })
  const testParams = {
    AMaaSClass: 'book',
    AMId: 1234,
    query: { domain: 'domain', domains: ['domain1', 'domain2'] }
  }
  it('calls buildURL with correct params', callback => {
    api.config({ stage: 'production', apiVersion: 'v2.0' })
    network.retrieveData(testParams, (error, result) => {
      expect(utils.buildURL).toHaveBeenCalledWith({
        AMaaSClass: 'book',
        AMId: 1234,
        stage: 'production',
        apiVersion: 'v2.0'
      })
      callback()
    })
  })
  it('calls makeRequest with correct params', callback => {
    api.config({ stage: 'production', apiVersion: 'v2.0' })
    network.retrieveData(testParams, (error, result) => {
      expect(utils.makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: 'GET',
        url: 'testURL',
        query: {
          camelcase: true,
          domain: 'domain',
          domains: 'domain1,domain2'
        },
        stage: 'production'
      }))
      callback()
    })
  })
  it('should return a promise if callback is not provided', () => {
    let promise = network.retrieveData(testParams)
    expect(promise).toBeInstanceOf(Promise)
  })
})

describe('insertData', () => {
  beforeAll(() => {
    utils.buildURL.mockImplementation(() => 'testURL')
    utils.makeRequest.mockImplementation(() =>
      Promise.resolve({ body: 'testBody' })
    )
  })
  const testParams = {
    AMaaSClass: 'book',
    AMId: 1234,
    data: {
      price: 20
    },
    queryParams: { someQuery: ['someThing', 'anotherValue'] }
  }
  it('should call buildURL with correct params', callback => {
    api.config({ stage: 'staging', apiVersion: 'v1.0' })
    network.insertData(testParams, (error, result) => {
      expect(utils.buildURL).toHaveBeenCalledWith({
        AMaaSClass: 'book',
        AMId: 1234,
        stage: 'staging',
        apiVersion: 'v1.0'
      })
      callback()
    })
  })
  it('should call makeRequest with correct params', callback => {
    network.insertData(testParams, (error, result) => {
      expect(utils.makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: 'POST',
        url: 'testURL',
        data: { price: 20 },
        query: { camelcase: true, someQuery: 'someThing,anotherValue' },
        stage: 'staging'
      }))
      callback()
    })
  })
  it('should return a promise if callback is not provided', () => {
    let promise = network.insertData(testParams)
    expect(promise).toBeInstanceOf(Promise)
  })
})

describe('searchData', () => {
  beforeAll(() => {
    utils.buildURL.mockImplementation(() => 'testURL')
    utils.makeRequest.mockImplementation(() =>
      Promise.resolve({ body: 'testBody' })
    )
  })
  const query = {
    assetManagerIds: [1, 2],
    numberParam: 62,
    domains: 'amaas.com'
  }
  it('should call buildURL with correct params', done => {
    api.config({ stage: 'staging', apiVersion: 'v2.0' })
    network.searchData(
      { AMaaSClass: 'monitorItems', AMId: 1, query },
      (error, result) => {
        expect(utils.buildURL).toHaveBeenCalledWith({
          AMaaSClass: 'monitorItems',
          AMId: 1,
          stage: 'staging',
          apiVersion: 'v2.0'
        })
        done()
      }
    )
  })
  it('should call makeRequest with correct params', done => {
    api.config({ stage: 'production', apiVersion: 'v2.0' })
    network.searchData(
      { AMaaSClass: 'monitorItems', AMId: 1, query },
      (error, result) => {
        expect(utils.makeRequest).toHaveBeenCalledWith(expect.objectContaining({
          method: 'SEARCH',
          url: 'testURL',
          data: {
            camelcase: true,
            assetManagerIds: '1,2',
            domains: 'amaas.com',
            numberParam: '62'
          },
          stage: 'production'
        }))
        done()
      }
    )
  })
  it('should return a promise if callback is not provided', () => {
    let promise = network.searchData({})
    expect(promise).toBeInstanceOf(Promise)
  })
})

describe('putData', () => {
  beforeAll(() => {
    utils.buildURL.mockImplementation(() => 'testURL')
    utils.makeRequest.mockImplementation(() =>
      Promise.resolve({ body: 'testBody' })
    )
  })
  it('should call buildURL with correct params', done => {
    api.config({ stage: 'staging', apiVersion: 'v1.0' })
    network.putData(
      {
        AMaaSClass: 'parties',
        AMId: 1,
        resourceId: 'testID',
        data: { test: 'testData' }
      },
      (error, result) => {
        expect(utils.buildURL).toHaveBeenCalledWith({
          AMaaSClass: 'parties',
          AMId: 1,
          resourceId: 'testID',
          stage: 'staging',
          apiVersion: 'v1.0'
        })
        done()
      }
    )
  })
  it('should call makeRequest with correct params', done => {
    api.config({ stage: 'staging' })
    network.putData(
      {
        AMaaSClass: 'parties',
        AMId: 1,
        resourceId: 'testID',
        data: { test: 'testData' }
      },
      (error, result) => {
        expect(utils.makeRequest).toHaveBeenCalledWith(expect.objectContaining({
          method: 'PUT',
          url: 'testURL',
          data: { test: 'testData' },
          stage: 'staging'
        }))
        done()
      }
    )
  })
  it('should return a promise if callback is not provided', () => {
    let promise = network.putData({
      AMaaSClass: 'parties',
      AMId: 1,
      resourceId: 'testID',
      data: { test: 'testData' }
    })
    expect(promise).toBeInstanceOf(Promise)
  })
})

describe('patchData', () => {
  let params
  beforeAll(() => {
    params = {
      AMaaSClass: 'positions',
      AMId: 1,
      resourceId: 'testID',
      data: { change: 'changed' }
    }
    utils.buildURL.mockImplementation(() => 'testURL')
    utils.makeRequest.mockImplementation(() =>
      Promise.resolve({ body: 'testBody' })
    )
  })
  it('should call buildURL with the correct params', done => {
    api.config({ stage: 'staging', apiVersion: 'v1.0' })
    network.patchData(params, (error, result) => {
      expect(utils.buildURL).toHaveBeenCalledWith({
        AMaaSClass: 'positions',
        AMId: 1,
        resourceId: 'testID',
        stage: 'staging',
        apiVersion: 'v1.0'
      })
      done()
    })
  })
  it('should call makeRequest with the correct params', done => {
    api.config({ stage: 'dev'})
    network.patchData(params, (error, result) => {
      expect(utils.makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: 'PATCH',
        url: 'testURL',
        data: { change: 'changed' },
        stage: 'dev'
      }))
      done()
    })
  })
  it('should return a promise if callback is not provided', () => {
    let promise = network.patchData(params)
    expect(promise).toBeInstanceOf(Promise)
  })
})
