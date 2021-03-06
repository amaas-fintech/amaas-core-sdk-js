export const CASH_TRANSACTION_TYPES = [
  'Cashflow',
  'Coupon',
  'Dividend',
  'Payment',
  'Settlement'
]
export const TRANSACTION_TYPES = [
  'Allocation',
  'Block',
  'Exercise',
  'Expiry',
  'Journal',
  'Maturity',
  'Net',
  'Novation',
  'Split',
  'Trade',
  'Transfer',
  ...CASH_TRANSACTION_TYPES
]
export const TRANSACTION_INVESTOR_ACTIONS = ['Subscription', 'Redemption']
export const TRANSACTION_LIFECYCLE_ACTIONS = ['Acquire', 'Remove']
export const TRANSACTION_ACTIONS = [
  'Buy',
  'Sell',
  'Short Sell',
  'Short Cover',
  'Deliver',
  'Receive',
  ...TRANSACTION_INVESTOR_ACTIONS,
  ...TRANSACTION_LIFECYCLE_ACTIONS
]
export const TRANSACTION_CANCEL_STATUSES = ['Cancelled', 'Netted', 'Novated']
export const TRANSACTION_STATUSES = [
  'New',
  'Amended',
  'Superseded',
  ...TRANSACTION_CANCEL_STATUSES
]
