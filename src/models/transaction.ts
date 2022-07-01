interface transactionType {
    originAccount: {
        agencyNumber: string;
        accountNumber: string;
        verificationCode: string;
        document: string;
        password: string
      };
    destinationAccount: {
      agencyNumber: string;
      accountNumber: string;
      verificationCode: string;
      document: string;
      password: string
    };
    account: {
        agencyNumber: string;
        accountNumber: string;
        verificationCode: string;
        document: string;
        password: string
    };
    value: string;
    agencyNumber: string;
    accountNumber: string;
    verificationCode: string;
    document: string;
    password: string
}

export { transactionType };
