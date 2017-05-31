import Transaction from './Transaction.js'
import { Charge, Code, Comment, Link, Reference, Party } from '../../children'

const Decimal = require('decimal.js')

describe('Transaction class', () => {
  describe('serialization', () => {
    it('should serialize properly', () => {
      const test = new Transaction({ transactionType: 'Trade' })
      expect(JSON.parse(JSON.stringify(test)).transactionType).toBeDefined()
      expect(JSON.parse(JSON.stringify(test)).transactionType).toEqual('Trade')
    })
  })
  describe('constructor', () => {
    let testTrans
    const data = {
      quantity: 2.54,
      price: 45.77,
      transactionId: 'testId'
    }
    beforeEach(() => {
      testTrans = new Transaction(data)
    })

    it('should set the AMaaS Reference', () => {
      expect(testTrans.references.AMaaS).toBeDefined()
      testTrans.references = { Office: { referenceValue: 'test' } }
      expect(testTrans.references.AMaaS).toBeDefined()
    })

    it('should set References correctly', () => {
      const references = {
        INT: { referenceValue: 'Internal1' },
        EXT: new Reference({ referenceValue: 'External1' })
      }
      testTrans.references = references
      expect(testTrans.references.AMaaS).toBeDefined()
      expect(testTrans.references.INT).toBeDefined()
      expect(testTrans.references.INT.referenceValue).toEqual('Internal1')
      expect(testTrans.references.EXT).toBeDefined()
      expect(testTrans.references.EXT.referenceValue).toEqual('External1')
    })

    it('should set Charges correctly', () => {
      const charges = {
        TAX: { chargeValue: 10 },
        COMMISSION: new Charge({ chargeValue: 5 })
      }
      testTrans.charges = charges
      expect(testTrans.charges.TAX).toBeInstanceOf(Charge)
      expect(testTrans.charges.COMMISSION).toBeInstanceOf(Charge)
    })

    it('should set Codes correctly', () => {
      const codes = {
        INT: { codeValue: 'Internal1' },
        EXT: new Code({ codeValue: 'External1' })
      }
      testTrans.codes = codes
      expect(testTrans.codes.INT).toBeInstanceOf(Code)
      expect(testTrans.codes.INT.codeValue).toEqual('Internal1')
      expect(testTrans.codes.EXT).toBeInstanceOf(Code)
      expect(testTrans.codes.EXT.codeValue).toEqual('External1')
    })

    it('should set Comments correctly', () => {
      const comments = {
        TRADER: { commentValue: 'Strategy1' },
        BACKEND: new Comment({ commentValue: 'Reconciled' })
      }
      testTrans.comments = comments
      expect(testTrans.comments.TRADER).toBeInstanceOf(Comment)
      expect(testTrans.comments.TRADER.commentValue).toEqual('Strategy1')
      expect(testTrans.comments.BACKEND).toBeInstanceOf(Comment)
      expect(testTrans.comments.BACKEND.commentValue).toEqual('Reconciled')
    })

    it('should set Links correclty', () => {
      const links = {
        SINGLE: [{ linkedId: 'single1' }],
        MULTIPLE: [
          { linkedId: 'multi1' },
          new Link({ linkedId: 'multi2' })
        ]
      }
      testTrans.links = links
      expect(testTrans.links.SINGLE[0]).toBeDefined()
      expect(testTrans.links.SINGLE[0].linkedId).toEqual('single1')
      expect(testTrans.links.MULTIPLE[0]).toBeDefined()
      expect(testTrans.links.MULTIPLE[0].linkedId).toEqual('multi1')
      expect(testTrans.links.MULTIPLE[1]).toBeDefined()
      expect(testTrans.links.MULTIPLE[1].linkedId).toEqual('multi2')
    })

    it('should set Parties correctly', () => {
      const parties = {
        COUNTERPARTY: { partyId: 'testId' },
        LEGAL: new Party({ partyId: 'legalId' })
      }
      testTrans.parties = parties
      expect(testTrans.parties.COUNTERPARTY).toBeDefined()
      expect(testTrans.parties.COUNTERPARTY.partyId).toEqual('testId')
      expect(testTrans.parties.LEGAL).toBeDefined()
      expect(testTrans.parties.LEGAL.partyId).toEqual('legalId')
    })

    it('should set transactionType to Trade if undefined', () => {
      expect(testTrans.transactionType).toEqual('Trade')
    })

    it('should set transactionStatus to New if undefined', () => {
      expect(testTrans.transactionStatus).toEqual('New')
    })

    it('grossSettlement should return price * quantity if undefined', () => {
      const quantity = new Decimal(data.quantity)
      const price = new Decimal(data.price)
      expect(testTrans.grossSettlement).toEqual(quantity.times(price))
    })

    it('netSettlement should return grossSettlement - chargesNetEffect() if not defined', () => {
      const quantity = new Decimal(data.quantity)
      const price = new Decimal(data.price)
      expect(testTrans.netSettlement).toEqual(quantity.times(price))
      testTrans.charges = {
        TAX: new Charge({ chargeValue: 10, active: true, netAffecting: true })
      }
      expect(testTrans.netSettlement).toEqual(quantity.times(price).minus(new Decimal(10)))
    })

    it('should set quantity to a Decimal', () => {
      expect(testTrans.quantity).toEqual(new Decimal(2.54))
    })

    it('should set price to a Decimal', () => {
      expect(testTrans.price).toEqual(new Decimal(45.77))
    })

    it('should set the AMaaS Reference', () => {
      expect(testTrans.references.AMaaS).toBeDefined()
      expect(testTrans.references.AMaaS.referenceValue).toEqual('testId')
      testTrans.references = undefined
      expect(testTrans.references.AMaaS).toBeDefined()
      expect(testTrans.references.AMaaS.referenceValue).toEqual('testId')
    })

    it('should throw if attempting to set invalid transactionAction', () => {
      function construct() {
        testTrans.transactionAction = 'notAType'
      }
      expect(construct).toThrowError('Invalid Transaction Action: notAType')
    })

    it('should throw if attempting to set invalid transactionStatus', () => {
      function construct() {
        testTrans.transactionStatus = 'notAType'
      }
      expect(construct).toThrowError('Invalid Transaction Status: notAType')
    })

    it('should throw if attempting to set invalid transactionType', () => {
      function construct() {
        testTrans.transactionType = 'notAType'
      }
      expect(construct).toThrowError('Invalid Transaction Type: notAType')
    })
  })

  describe('class methods', () => {
    let trans
    const data = {
      price: 45.66,
      charges: {
        TAX : new Charge({ chargeValue: 10, currency: 'SGD', active: true, netAffecting: true }),
        COMMISSION : new Charge({ chargeValue: 20, currency: 'SGD', active: true, netAffecting: true })
      },
      codes: {
        INT: new Code({ codeValue: 'InternalCode1' })
      },
      links: {
        'Single1': [new Link({ linkedId: 'singleLinkedTransactionId1' })],
        'Multiple1': [
          new Link({ linkedId: 'multiLinkedTransactionId1' }),
          new Link({ linkedId: 'multiLinkedTransactionId2' })
        ]
      }
    }
    beforeEach(() => {
      trans = new Transaction(data)
    })
    it('chargesNetEffect should return all active and netAffecting charges', () => {
      trans.chargesNetEffect()
      expect(trans.chargesNetEffect()).toEqual(new Decimal(30))
    })
    it('upsertCode should upsert new Code', () => {
      trans.upsertCode('EXT', { codeValue: 'ExternalCode1' })
      expect(Object.keys(trans.codes).length).toEqual(2)
      expect(trans.codes.EXT.codeValue).toEqual('ExternalCode1')
    })
    it('upsertLinkSet should upsert a Link set (array)', () => {
      trans.upsertLinkSet('Single2', [{ linkedId: 'singleLinkedTransactionId2' }])
      expect(trans.links.Single2).toBeDefined()
      expect(trans.links.Single2[0].linkedId).toEqual('singleLinkedTransactionId2')
      trans.upsertLinkSet('Multiple2', [new Link({ linkedId: 'multiLinkedTransactionId3' }), new Link({ linkedId: 'multiLinkedTransactionId4' })])
      expect(trans.links.Multiple2).toBeDefined()
      expect(trans.links.Multiple2[0].linkedId).toEqual('multiLinkedTransactionId3')
    })
    it('addLinks should add a Link', () => {
      trans.addLink('Multiple1', { linkedId: 'multiLinkedTransactionId3' })
      expect(trans.links.Multiple1[2]).toBeDefined()
      expect(trans.links.Multiple1[2].linkedId).toEqual('multiLinkedTransactionId3')
      trans.addLink('Multiple1', new Link({ linkedId: 'multiLinkedTransactionId4' }))
      expect(trans.links.Multiple1[3]).toBeDefined()
      expect(trans.links.Multiple1[3].linkedId).toEqual('multiLinkedTransactionId4')
    })
    it('removeLink should throw if attempting to remove non-existent Link', () => {
      function removeKey() {
        trans.removeLink('notAKey', 'test')
      }
      expect(removeKey).toThrowError('Link Key Not Found: notAKey')
      function remove() {
        trans.removeLink('Single1', 'notALink')
      }
      expect(remove).toThrowError('Linked Transaction ID Not Found: notALink')
    })
    it('removeLink should remove a Link', () => {
      const linkCount = trans.links.Multiple1.length
      trans.removeLink('Multiple1', 'multiLinkedTransactionId2')
      expect(trans.links.Multiple1.length).toEqual(linkCount - 1)
      const filteredLinks = trans.links.Multiple1.filter(link => link.linkedId === 'multiLinkedTransactionId2')
      expect(filteredLinks.length).toEqual(0)
    })
  })


describe('exportToExcel', () => {
    test('with callback', callback => {
      exportToExcel({AMId: 1, bookId: 1}, (error, transactions) => {
        expect(Array.isArray(transactions)).toBeTruthy()
        expect(transactions[0]).toBeInstanceOf(Transaction)
        callback(error)
      })
    })

    test('with promise', callback => {
      let promise = exportToExcel({AMId: 1, bookId: 1})
      expect(promise).toBeInstanceOf(Promise)
      promise.then(transactions => {
        expect(Array.isArray(transactions)).toBeTruthy()
        expect(transactions[0]).toBeInstanceOf(Transactions)
        callback()
      })
    })

    it('should export to excel', done => {
      const params = {
        AMId: 1,
        bookId: 1
      }
      exportToExcel(params)
        .then(res => {
          if (Array.isArray(res) && res.length > 0) {
            expect(res[0]).toBeDefined()
            expect(res[0].assetManagerId).toEqual(1)
          } else if (!Array.isArray(res)) {
            expect(res.assetManagerId).toEqual(1)
          }
          done()
        })
        .catch(err => console.error(err))
    })
  })

  })