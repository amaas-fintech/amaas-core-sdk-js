import Reference from './'

describe('Reference', () => {
  describe('serialization', () => {
    it('should serialize properly', () => {
      const test = new Reference({ updatedBy: 'test' })
      expect(JSON.parse(JSON.stringify(test)).updatedBy).toBeDefined()
      expect(JSON.parse(JSON.stringify(test)).updatedBy).toEqual('test')
    })
  })
  describe('constructor', () => {
    it('it should set referenceValue correctly', () => {
        const value = 'C92US'
        const reference = new Reference({ referenceValue: value })
        expect(reference.referenceValue).toEqual(value)
      })
  })
})
