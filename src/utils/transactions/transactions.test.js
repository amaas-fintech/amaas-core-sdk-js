import {
  retrieve,
  insert,
  amend,
  partialAmend,
  search,
  fieldsSearch,
  cancel,
  uploadCSV,
  executeCSVJob,
  listImportJobs,
  getCSVImportDetails,
  retrieveMTM
} from './transactions'
import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()
network.insertData = jest.fn()
network.patchData = jest.fn()
network.putData = jest.fn()
network.searchData = jest.fn()
network.deleteData = jest.fn()

api.config({
  stage: 'staging',
  token: process.env.API_TOKEN
})

const mockTransaction = {
  settlementDate: '2017-03-17',
  transactionDate: '2017-03-15',
  assetManagerId: 1,
  counterpartyBookId: 'G95EIYQA6I',
  assetId: 846,
  settlementCurrency: 'SGD',
  transactionType: 'Block',
  transactionAction: 'Remove',
  price: 352,
  netSettlement: 35269,
  transactionCurrency: 'SGD',
  executionTime: '2017-03-15T05:02:18.928148+00:00',
  clientId: 1,
  grossSettlement: 35269,
  transactionId: 'testTransactionID',
  assetBookId: 'JWXWNSBABR',
  quantity: 100
}
const mockUploadResult = {
  summary: {
    new: 10,
    amended: 10,
    errors: [],
    warnings: [],
    importId: 'mockImportId'
  }
}

const mockImportList = {
  items: [
    {
      import_id: 'import-1',
      status: 'error',
      error: {
        message: 'error-1',
        details: {},
        type: 'error'
      },
      owner: 88,
      summary: {
        total: 10
      }
    }
  ]
}

const mockImportDetails = {
  status: 'Importing',
  error: {
    message: 'test message',
    details: {},
    type: 'testType'
  },
  details: [
    {
      row: 8,
      transaction: {},
      error: {
        message: 'test message',
        details: {},
        type: 'testType'
      }
    }
  ]
}

const mockMTM = [
  {
    createdBy: 'amaas_system',
    version: 1,
    mtmStatus: 'Active',
    updatedTime: '2017-10-25T10:21:59.663765',
    clientId: 1,
    assetId: 'FWDEURGBP20171106',
    mtmValue: '-6004.8185524499',
    updatedBy: 'amaas_system',
    internalId: 5,
    bookId: 'FWD_PNL',
    message: '',
    assetManagerId: 520,
    createdTime: '2017-10-25T10:21:59.663765',
    mtmTimestamp: '2017-10-25T18:21:30.448357+00:00',
    businessDate: '2017-10-03'
  }
]

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve(mockTransaction)
    )
  })
  test('with promise', () => {
    let promise = retrieve({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    retrieve(
      { AMId: 1, resourceId: 'testID', query: { version: 8 } },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith(
          expect.objectContaining({
            AMaaSClass: 'transactions',
            AMId: 1,
            resourceId: 'testID',
            query: { version: 8 }
          })
        )
        done()
      }
    )
  })
})

describe('insert', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() =>
      Promise.resolve(mockTransaction)
    )
  })
  test('with promise', () => {
    let promise = insert({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    insert({ AMId: 1, transaction: mockTransaction }, (error, result) => {
      expect(network.insertData).toHaveBeenCalledWith(
        expect.objectContaining({
          AMaaSClass: 'transactions',
          AMId: 1,
          data: JSON.parse(JSON.stringify(mockTransaction))
        })
      )
      done()
    })
  })
})

describe('amend', () => {
  beforeAll(() => {
    network.putData.mockImplementation(() => Promise.resolve(mockTransaction))
  })
  test('with promise', () => {
    let promise = amend({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls putData with correct params', done => {
    amend(
      { AMId: 1, resourceId: 'testID', transaction: mockTransaction },
      (error, result) => {
        expect(network.putData).toHaveBeenCalledWith(
          expect.objectContaining({
            AMaaSClass: 'transactions',
            AMId: 1,
            resourceId: 'testID',
            data: JSON.parse(JSON.stringify(mockTransaction))
          })
        )
        done()
      }
    )
  })
})

describe('partialAmend', () => {
  beforeAll(() => {
    network.patchData.mockImplementation(() => Promise.resolve(mockTransaction))
  })
  test('with promise', () => {
    let promise = partialAmend({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls patchData with correct params', done => {
    partialAmend(
      { AMId: 1, resourceId: 'testID', changes: { changed: 'changed' } },
      (error, result) => {
        expect(network.patchData).toHaveBeenCalledWith(
          expect.objectContaining({
            AMaaSClass: 'transactions',
            AMId: 1,
            resourceId: 'testID',
            data: { changed: 'changed' }
          })
        )
        done()
      }
    )
  })
})

describe('search', () => {
  beforeAll(() => {
    network.searchData.mockImplementation(() =>
      Promise.resolve(mockTransaction)
    )
  })
  test('with promise', () => {
    let promise = search({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    search(
      { AMId: 1, query: { queryKey: ['queryValues'] } },
      (error, result) => {
        expect(network.searchData).toHaveBeenCalledWith(
          expect.objectContaining({
            AMaaSClass: 'transactions',
            AMId: 1,
            query: { queryKey: ['queryValues'] }
          })
        )
        done()
      }
    )
  })
})

describe('fieldsSearch', () => {
  beforeAll(() => {
    network.searchData.mockImplementation(() =>
      Promise.resolve(mockTransaction)
    )
  })
  test('with promise', () => {
    let promise = search({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('throws if missing assetManagerIds', () => {
    const willThrow = () => {
      fieldsSearch({ fields: ['comments'] })
    }
    expect(willThrow).toThrowError(
      new Error('You must specify at least one Asset Manager ID')
    )
  })
  it('calls searchData with the correct params', done => {
    fieldsSearch(
      {
        assetManagerIds: [1, 2],
        fields: ['description', 'comments', 'settlementCurrency']
      },
      (error, result) => {
        expect(network.searchData).toHaveBeenCalledWith(
          expect.objectContaining({
            AMaaSClass: 'transactions',
            query: {
              assetManagerIds: [1, 2],
              fields: ['description', 'comments', 'settlementCurrency']
            }
          })
        )
        done()
      }
    )
  })
})

describe('cancel', () => {
  beforeAll(() => {
    network.deleteData.mockImplementation(() =>
      Promise.resolve(mockTransaction)
    )
  })
  test('with promise', () => {
    let promise = cancel({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls deleteData with correct params', done => {
    cancel({ AMId: 1, resourceId: 'testID' }, (error, result) => {
      expect(network.deleteData).toHaveBeenCalledWith(
        expect.objectContaining({
          AMaaSClass: 'transactions',
          AMId: 1,
          resourceId: 'testID'
        })
      )
      done()
    })
  })
})

describe('uploadCSV', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() =>
      Promise.resolve(mockUploadResult)
    )
  })
  test('with promise', () => {
    let promise = uploadCSV({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    uploadCSV({ AMId: 88, data: 'csv' }, (error, result) => {
      expect(network.insertData).toHaveBeenCalledWith(
        expect.objectContaining({
          AMaaSClass: 'uploadTransactions',
          AMId: 88,
          data: 'csv',
          contentType: 'text/csv'
        })
      )
      done()
    })
  })
})

describe('executeCSVJob', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() =>
      Promise.resolve({ status: 'importing' })
    )
  })
  test('with promise', () => {
    let promise = executeCSVJob({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    executeCSVJob({ AMId: 88, importId: 'testId' }, (error, result) => {
      expect(network.insertData).toHaveBeenCalledWith(
        expect.objectContaining({
          AMaaSClass: 'executeTransactionsUpload',
          AMId: 88,
          resourceId: 'testId/execute'
        })
      )
      done()
    })
  })
})

describe('listImportJobs', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve(mockImportList)
    )
  })
  afterEach(() => {
    network.retrieveData.mockClear()
  })
  test('with promise', () => {
    let promise = listImportJobs({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    listImportJobs({ AMId: 88, more: 'more' }, (error, result) => {
      expect(error).toBeNull()
      expect(network.retrieveData).toHaveBeenCalledWith(
        expect.objectContaining({
          AMaaSClass: 'csvImportDetails',
          AMId: 88,
          query: { more: 'more' }
        })
      )
      done()
    })
  })
  it('calls retrieveData with correct params (without more)', done => {
    listImportJobs({ AMId: 88 }, (error, result) => {
      expect(error).toBeNull()
      expect(network.retrieveData).toHaveBeenCalledWith(
        expect.objectContaining({
          AMaaSClass: 'csvImportDetails',
          AMId: 88,
          query: {}
        })
      )
      done()
    })
  })
})

describe('getCSVImportDetails', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() =>
      Promise.resolve(mockImportDetails)
    )
  })
  test('with promise', () => {
    let promise = getCSVImportDetails({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    getCSVImportDetails({ AMId: 88, importId: 'testId' }, (error, result) => {
      expect(network.retrieveData).toHaveBeenCalledWith(
        expect.objectContaining({
          AMaaSClass: 'csvImportDetails',
          AMId: 88,
          resourceId: 'testId'
        })
      )
      done()
    })
  })
})

describe('retriveMTM', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() => Promise.resolve(mockMTM))
  })
  test('with promise', () => {
    let promise = retrieveMTM({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params (no assetId)', done => {
    retrieveMTM(
      {
        AMId: 88,
        bookIds: 'book-1',
        date: '2017-01-01',
        startDate: '2016-01-01'
      },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith(
          expect.objectContaining({
            AMaaSClass: 'mtm',
            AMId: 88,
            query: {
              bookIds: 'book-1',
              startBusinessDate: '2016-01-01',
              endBusinessDate: '2017-01-01'
            }
          })
        )
        expect(error).toBeNull()
        done()
      }
    )
  })
  it('calls retrieveData with correct params (assetId)', done => {
    retrieveMTM(
      {
        AMId: 88,
        bookIds: 'book-1',
        assetIds: 'asset-1',
        date: '2017-01-01'
      },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith(
          expect.objectContaining({
            AMaaSClass: 'mtm',
            AMId: 88,
            query: {
              bookIds: 'book-1',
              assetIds: 'asset-1',
              startBusinessDate: '2017-01-01',
              endBusinessDate: '2017-01-01'
            }
          })
        )
        expect(error).toBeNull()
        done()
      }
    )
  })
  it('throws if startDate is supplied without date', () => {
    const willThrow = () => {
      retrieveMTM({ AMId: 88, bookIds: 'book-1', startDate: '2017-01-01' })
    }
    expect(willThrow).toThrowError(
      new Error('If startDate is supplied, date must also be supplied')
    )
  })
})
