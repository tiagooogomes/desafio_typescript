interface transactionType {
    originAccount: {
        agencyNumber: string;
        accountNumber: string;
        verificationCode: string;
        document: string;
      };
    destinationAccount: {
      agencyNumber: string;
      accountNumber: string;
      verificationCode: string;
      document: string;
    };
    account: {
        agencyNumber: string;
        accountNumber: string;
        verificationCode: string;
        document: string;
    };
    value: string;
    agencyNumber: string;
    accountNumber: string;
    verificationCode: string;
    document: string;
}

export { transactionType };
