import * as api from '../../exports/api'
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
    let promise = api.PositionPNL.retrieve({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    api.PositionPNL.retrieve(
      { AMId: 88, query: { key: 'value' } },
      (error, result) => {
        expect(network.retrieveData).toHaveBeenCalledWith({
          AMaaSClass: 'positionpnl',
          AMId: 88,
          query: { combinePeriods: true, key: 'value' }
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
    let promise = api.PositionPNL.amend({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls putData with the correct params', done => {
    api.PositionPNL.amend(
      { AMId: 88, data: { key: 'value' } },
      (error, result) => {
        expect(network.putData).toHaveBeenCalledWith({
          AMaaSClass: 'positionpnl',
          AMId: 88,
          data: { key: 'value' }
        })
        expect(error).toBeNull()
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
    let promise = api.PositionPNL.insert({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    api.PositionPNL.insert(
      { AMId: 88, data: { key: 'value' }, queryParams: { query: 'param' } },
      (error, result) => {
        expect(network.insertData).toHaveBeenCalledWith({
          AMaaSClass: 'positionpnl',
          AMId: 88,
          data: { key: 'value' },
          queryParams: { query: 'param' }
        })
        expect(error).toBeNull()
        done()
      }
    )
  })
})
