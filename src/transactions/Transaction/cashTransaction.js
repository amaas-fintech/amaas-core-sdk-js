import Transaction from './transaction'

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
