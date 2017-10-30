import Transaction from './transaction'
import { ICashTransaction } from '../../../index.d'

class CashTransaction extends Transaction {
  constructor(prop: ICashTransaction) {}
}

export default CashTransaction
