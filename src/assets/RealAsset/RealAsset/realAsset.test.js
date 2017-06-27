import RealAsset from './realAsset.js'

describe('RealAsset', () => {
  describe('constructor', () => {
      it('set ownership correctly', ()=>{
        const ownerships={
            ownership1:{
                partyId: 1,
                split: 0.5
            },
            ownerhsip2:{
                partyId: 2, 
                split: 0.5
            }
        }
       const testRealAsset=new RealAsset({assetId: 'assetId', ownership: ownerships})
       expect(testRealAsset.ownership).toEqual(ownerships)
      })

      it('should throw an error message', ()=>{
        const ownerships={
            ownership1:{
                partyId: 1,
                splits: 0.6
            },
            ownerhsip2:{
                partyId: 2,
                splits: 0.5
            }
        }
       function testError() {
           const testRealAsset=new RealAsset({assetId: 'assetId', ownership: ownerships})
       }
       expect(testError).toThrowError("The sum of split should be 1")
       
      })
  })
})