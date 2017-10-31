import Transaction from './transaction'
import * as types from '../enums'

class CashTransaction extends Transaction {
  constructor({
    assetManagerId,
    assetBookId,
    counterpartyBookId,
    transactionAction,
    assetId,
    quantity,
    transactionDate,
    settlementDate,
    transactionCurrency,
    settlementCurrency,
    assets,
    executionTime,
    transactionType,
    transactionId,
    transactionStatus,
    charges,
    codes,
    comments,
    links,
    parties,
    rates,
    references
  }) {
    console.log(transactionType)
    if (types.CASH_TRANSACTION_TYPES.indexOf(transactionType) === -1) {
      throw new Error(`Invalid Transaction Type: ${transactionType}`)
    }
    super({
      assetManagerId,
      assetBookId,
      counterpartyBookId,
      transactionAction,
      assetId,
      quantity,
      transactionDate,
      settlementDate,
      price: 1,
      transactionCurrency,
      settlementCurrency,
      assets,
      executionTime,
      transactionType,
      transactionId,
      transactionStatus,
      charges,
      codes,
      comments,
      links,
      parties,
      rates,
      references
    })
  }
}

export default CashTransaction
