import { Transaction } from "./transaction"

interface AccountResponse {
  agencyNumber: string
  agencyVerificationCode: string
  accountNumber: string
  accountVerificationCode: string
  owner: string
  document: string
  birthdate: Date
}

interface DepositResponse {
  transactionId: string
  type: string
  value: number
  date: Date
  account: {
    agencyNumber: string
    agencyVerificationCode: string
    accountNumber: string
    accountVerificationCode: string
    owner: string
    document: string
  }
}

interface DraftResponse {
  transactionId: string
  type: string
  value: number
  date: Date
  account: {
    agencyNumber: string
    agencyVerificationCode: string
    accountNumber: string
    accountVerificationCode: string
    owner: string
    document: string
  }
}

interface TransferResponse {
  transactionId: string
  type: string
  value: number
  date: Date
  originAccount: {
    agencyNumber: string
    agencyVerificationCode: string
    accountNumber: string
    accountVerificationCode: string
    document: string
  }
  destinationAccount: {
    agencyNumber: string
    agencyVerificationCode: string
    accountNumber: string
    accountVerificationCode: string
    document: string
  }
}

interface ExtractResponse {
  agencyNumber: string
  agencyVerificationCode: string
  accountNumber: string
  accountVerificationCode: string
  owner: string
  document: string
  birthdate: Date
  balance: number;
  transactions: Transaction[];
}

export { AccountResponse, DepositResponse, DraftResponse, TransferResponse, ExtractResponse };