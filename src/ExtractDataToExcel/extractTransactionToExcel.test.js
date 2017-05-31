import { retrieve, insert, amend, partialAmend, search, cancel } from '../../utils/transactions'
import * as api from '../../exports/api'
import { retrieveData, insertData, patchData, putData, searchData, deleteData } from '../../utils/network'

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