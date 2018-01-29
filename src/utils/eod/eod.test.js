import * as api from '../../exports/api'
import * as network from '../network'

network.insertData = jest.fn()
network.retrieveData = jest.fn()

api.config({
  stage: 'staging'
})

const mockBatch = {
  batchType: 'type',
  businessDate: '2018-07-04',
  status: 'Active',
  executionId: '123abc',
  expirationTime: 'time',
  assetManagerId: 8,
  bookId: 'book-1',
  closeTime: 'time',
  timezone: 'Asia/Singapore'
}

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() => Promise.resolve('eod'))
  })
  test('with promise', () => {
    let promise = api.EOD.retrieve({ AMId: 88 })
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.EOD.retrieve(
      {
        AMId: 88,
        query: {
          businessDateStart: '2017-11-27',
          businessDateEnd: '2017-12-31',
          assetIds: '358.HK'
        }
      },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'eod',
          AMId: 88,
          query: {
            businessDateStart: '2017-11-27',
            businessDateEnd: '2017-12-31',
            assetIds: '358.HK'
          }
        })
        done()
      }
    )
  })
})

describe('triggerEODJob', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() => Promise.resolve(mockBatch))
  })
  afterEach(() => {
    network.insertData.mockClear()
  })
  test('with promise', () => {
    let promise = api.EOD.triggerEODJob({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    api.EOD.triggerEODJob(
      { AMId: 88, bookId: 'book-1', businessDate: '2017-07-04' },
      (error, result) => {
        const expectedParams = expect.objectContaining({
          AMaaSClass: 'eodBatch',
          AMId: 88,
          resourceId: 'book-1',
          queryParams: { businessDate: '2017-07-04' }
        })
        expect(error).toBeNull()
        expect(network.insertData).toHaveBeenCalledWith(expectedParams)
        done()
      }
    )
  })
  it('calls insertData with correct params (closeTime and timezone)', done => {
    api.EOD.triggerEODJob(
      {
        AMId: 88,
        bookId: 'book-1',
        businessDate: '2017-07-04',
        closeTime: '12:00:00',
        timezone: 'Asia/Singapore'
      },
      (error, result) => {
        const expectedParams = expect.objectContaining({
          AMaaSClass: 'eodBatch',
          AMId: 88,
          resourceId: 'book-1',
          queryParams: {
            businessDate: '2017-07-04',
            closeTime: '12:00:00',
            timezone: 'Asia/Singapore'
          }
        })
        expect(error).toBeNull()
        expect(network.insertData).toHaveBeenCalledWith(expectedParams)
        done()
      }
    )
  })
})

describe('listBatchJobs', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() => Promise.resolve(mockBatch))
  })
  afterEach(() => {
    network.retrieveData.mockClear()
  })
  test('with promise', () => {
    const promise = api.EOD.listBatchJobs({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.EOD.listBatchJobs(
      { AMId: 88, bookId: 'book-1', businessDate: '2018-07-04' },
      (error, result) => {
        const expectedParams = expect.objectContaining({
          AMaaSClass: 'eodBatch',
          AMId: 88,
          resourceId: 'book-1',
          query: { businessDate: '2018-07-04' }
        })
        expect(error).toBeNull()
        expect(network.retrieveData).toHaveBeenCalledWith(expectedParams)
        done()
      }
    )
  })
  it('calls retrieveData with correct params (with executionId)', done => {
    api.EOD.listBatchJobs(
      {
        AMId: 88,
        bookId: 'book-1',
        businessDate: '2018-07-04',
        executionId: '123abc'
      },
      (error, result) => {
        const expectedParams = expect.objectContaining({
          AMaaSClass: 'eodBatch',
          AMId: 88,
          resourceId: 'book-1',
          query: { businessDate: '2018-07-04', executionId: '123abc' }
        })
        expect(error).toBeNull()
        expect(network.retrieveData).toHaveBeenCalledWith(expectedParams)
        done()
      }
    )
  })
})
