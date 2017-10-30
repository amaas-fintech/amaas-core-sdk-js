import { PhoneNumber } from './'

describe('PhoneNumber', () => {
  describe('constructor', () => {
    it('should set active to true if unassigned', () => {
      const testPhoneNumber = new PhoneNumber({})
      expect(testPhoneNumber.active).toEqual(true)
    })
    it('should set active to false if assigned false', () => {
      const testPhoneNumber = new PhoneNumber({ active: false })
      expect(testPhoneNumber.active).toEqual(false)
    })
    it('should set active to true if assigned true', () => {
      const testPhoneNumber = new PhoneNumber({ active: true })
      expect(testPhoneNumber.active).toEqual(true)
    })
  })
})
