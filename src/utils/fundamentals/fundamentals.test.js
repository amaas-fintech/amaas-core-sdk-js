import * as fundamentals from './fundamentals'
import * as network from '../network'

network.searchData = jest.fn()

let mockCountry = {
    countryCode: 'SG'
}
let mockBizDate = {
    date: '2017-6-30',
    code: 'SG',
    offset: 1
}

describe('utils/fundamentals', () => {
    describe('countries', () => {
        beforeAll(() => {
          network.searchData.mockImplementation(() => Promise.resolve(mockCountry))
        })
        test('with promise', () => {
            let promise = fundamentals.countries({countryCode: 'SG'})
            expect(promise).toBeInstanceOf(Promise)
        })           
        it('calls searchData with the correct parameters', done => {
              fundamentals.countries( {code: 'SG'}, (error, result) => {
              expect(network.searchData).toHaveBeenCalledWith({ AMaaSClass: 'fundamentalCountries', query: { countryCode: [ 'SG' ]} })
              done()
            })
        })
    })

    describe('calcBusinessDate', () => {
        beforeAll(() => {
          network.searchData.mockImplementation(() => Promise.resolve(mockBizDate))
        })
        test('with promise', () => {
            let promise = fundamentals.calcBusinessDate({date: '2017-6-30', code: 'SG', offset: 1})
            expect(promise).toBeInstanceOf(Promise)
        })           
        it('calls searchData with the correct parameters', done => {
              fundamentals.calcBusinessDate( {date: '2017-6-30', code: 'SG', offset: 1}, (error, result) => {
              expect(network.searchData).toHaveBeenCalledWith({ AMaaSClass: 'fundamentalBusinessDate', query: {stratDate: ['2017-6-30'], countryCode: ['SG'], offset: [1]} })
              done()
            })
        })
    })
})
