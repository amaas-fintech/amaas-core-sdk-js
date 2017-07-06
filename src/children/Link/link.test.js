import Link from './'

describe('Link class', () => {
  describe('constructor', () => {
    it('it should set linkedId correctly', () => {
        const value = 'AJTOJT3J'
        const link = new Link({ linkedId: value })
        expect(link.linkedId).toEqual(value)
      })
  })
})
