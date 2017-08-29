import uuid from 'uuid'
import { retrieve, requestRelationship, getRelatedAMID, insert, amend, sendInvitation } from './relationships'
import Relationship from '../../relationships'
import * as api from '../../exports/api'
import * as network from '../network'

network.retrieveData = jest.fn()
network.insertData = jest.fn()
network.patchData = jest.fn()
network.putData = jest.fn()
network.searchData = jest.fn()
network.deleteData = jest.fn()

api.config({
  stage: 'staging'
})

const mockRel = {
  assetManagerId: 1,
  relationshipId: 'ID',
  relatedId: 2,
  relationshipType: 'Employee',
  clientId: 5,
  relationshipStatus: 'Pending',
}

describe('retrieve', () => {
  beforeAll(() => {
    network.retrieveData.mockImplementation(() => Promise.resolve(mockRel))
  })
  test('with promise', () => {
    let promise = retrieve({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    retrieve({ AMId: 1, resourceId: 'testID' }, (error, result) => {
      expect(network.retrieveData).toHaveBeenCalledWith({ AMaaSClass: 'relationships', AMId: 1 })
      done()
    })
  })
})

describe('requestRelationship', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() => Promise.resolve(mockRel))
  })
  test('with promise', () => {
    let promise = requestRelationship({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    requestRelationship({ AMId: 1, options: { relationshipType: 'Employee', relationshipId: 'testID' } }, (error, result) => {
      expect(network.insertData).toHaveBeenCalledWith({ AMaaSClass: 'relationshipRequest', AMId: 1, data: { relationshipType: 'Employee', relationshipId: 'testID' } })
      done()
    })
  })
})

describe('getRelatedAMID', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() => Promise.resolve(mockRel))
  })
  test('with promise', () => {
    let promise = getRelatedAMID({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls retrieveData with correct params', done => {
    getRelatedAMID({ AMId: 1, options: { includeInactive: true, relationshipType: 'Employee' } }, (error, result) => {
      expect(network.retrieveData).toHaveBeenCalledWith({ AMaaSClass: 'relatedAssetManagerID', AMId: 1, query: { includeInactive: true, relationshipType: 'Employee' } })
      done()
    })
  })
})

describe('insert', () => {
  beforeAll(() => {
    network.insertData.mockImplementation(() => Promise.resolve(mockRel))
  })
  test('with promise', () => {
    let promise = insert({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls insertData with correct params', done => {
    insert({ AMId: 1, relationship: mockRel }, (error, result) => {
      expect(network.insertData).toHaveBeenCalledWith({ AMaaSClass: 'relationships', AMId: 1, data: JSON.parse(JSON.stringify(mockRel)) })
      done()
    })
  })
})

describe('amend', () => {
  beforeAll(() => {
    network.putData.mockImplementation(() => Promise.resolve(mockRel))
  })
  test('with promise', () => {
    let promise = amend({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls putData with correct params', done => {
    amend({ AMId: 1, relationship: mockRel }, (error, result) => {
      expect(network.putData).toHaveBeenCalledWith({ AMaaSClass: 'relationships', AMId: 1, data: JSON.parse(JSON.stringify(mockRel)) })
      done()
    })
  })
})

describe('sendInvitation', () => {
  beforeAll(() => {
    network.putData.mockImplementation(() => Promise.resolve(true))
  })
  test('with promise', () => {
    let promise = sendInvitation({})
    expect(promise).toBeInstanceOf(Promise)
  })
  it('calls putData with correct params', done => {
    sendInvitation({ AMId: 1, toEmail: 'offboard@argomi.com', fromEmail: 'onboard@argomi.com', companyName: 'Argomi' }, (error, result) => {
      expect(network.putData).toHaveBeenCalledWith({ AMaaSClass: 'relationships', AMId: 1, resourceId: 'invitations', data: { userEmail: 'offboard@argomi.com', adminEmail: 'onboard@argomi.com', companyName: 'Argomi' } })
      done()
    })
  })
})