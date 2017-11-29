import * as api from '../../exports/api'
import { transactions } from '../../exports/transactions'
import * as network from '../network'

network.retrieveData = jest.fn()
network.putData = jest.fn()
network.insertData = jest.fn()

api.config({
  stage: 'staging'
})

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() => Promise.resolve([{}]))
  })
  test('with promise', () => {
    let promise = api.TransactionPNL.retrieve({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.TransactionPNL.retrieve(
      { AMId: 88, query: { key: 'value' } },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'transactionpnl',
          AMId: 88,
          query: { key: 'value' }
        })
        expect(error).toBeNull()
        done()
      }
    )
  })
})

describe('amend', () => {
  beforeAll(() => {
    network.putData.mockImplementation(() => Promise.resolve({}))
  })
  test('with promise', () => {
    let promise = api.TransactionPNL.amend({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls putData with correct params', done => {
    api.TransactionPNL.amend(
      { AMId: 88, data: { key: 'value' }, queryParams: { query: 'params' } },
      (error, result) => {
        expect(network.putData).toHaveBeenCalledWith({
          AMaaSClass: 'transactionpnl',
          AMId: 88,
          data: { key: 'value' },
          queryParams: { query: 'params' }
        })
        expect(error).toBeNull()
        expect(result).toEqual(new transactions.TransactionPNL({}))
        done()
      }
    )
  })
})

describe('insert', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() => Promise.resolve({}))
  })
  test('with promise', () => {
    let promise = api.TransactionPNL.insert({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    api.TransactionPNL.insert(
      { AMId: 88, data: { key: 'value' }, queryParams: { query: 'params' } },
      (error, result) => {
        expect(network.insertData).toHaveBeenCalledWith({
          AMaaSClass: 'transactionpnl',
          AMId: 88,
          data: { key: 'value' },
          queryParams: { query: 'params' }
        })
        expect(result).toEqual(new transactions.TransactionPNL({}))
        expect(error).toBeNull()
        done()
      }
    )
  })
})
