import PNLResult from './PNLResult'

describe('PNLResult class', () => {
  let testPNLResult
  let data = {
    clientId: "123",
    assetManagerId: "123",
    assetBookId: "123",
    businessDate: new Date(),
    realisedPNL: "99",
    unrealisedPNL: "99",
    totalPNL: "100",
    fxPNL: "99",
    pnlStatus: "new",
    message: "message",
    version: "123",
    pnlTimeStamp: new Date(),
    transactionId: "123"
  }
  it('should create a new PNLResult object correctly', () => {
    testPNLResult = new PNLResult(data)
    console.log(testPNLResult)
    expect(typeof testPNLResult).toBe('object')
  })
})
