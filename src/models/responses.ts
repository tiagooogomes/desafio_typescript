import { Transaction } from "./transaction";

interface AccountResponse {
  accountVerificationCode: string;
  agencyVerificationCode: string;
  accountNumber: string;
  agencyNumber: string;
  document: string;
  birthdate: Date;
  owner: string;
};

interface DepositResponse {
  transactionId: string;
  value: number;
  type: string;
  date: Date;
  account: {
    accountVerificationCode: string;
    agencyVerificationCode: string;
    accountNumber: string;
    agencyNumber: string;
    document: string;
    owner: string;
  };
};

interface DraftResponse {
  transactionId: string;
  value: number;
  type: string;
  date: Date;
  account: {
    agencyVerificationCode: string;
    accountVerificationCode: string;
    accountNumber: string;
    agencyNumber: string;
    document: string;
    owner: string;
  };
};

interface TransferResponse {
  transactionId: string;
  value: number;
  type: string;
  date: Date;
  originAccount: {
    accountVerificationCode: string;
    agencyVerificationCode: string;
    accountNumber: string;
    agencyNumber: string;
    document: string;
  };
  destinationAccount: {
    accountVerificationCode: string;
    agencyVerificationCode: string;
    accountNumber: string;
    agencyNumber: string;
    document: string;
  };
};

interface ExtractResponse {
  accountVerificationCode: string;
  agencyVerificationCode: string;
  accountNumber: string;
  agencyNumber: string;
  document: string;
  balance: number;
  birthdate: Date;
  owner: string;
  transactions: Transaction[];
};

export { AccountResponse, DepositResponse, DraftResponse, TransferResponse, ExtractResponse };