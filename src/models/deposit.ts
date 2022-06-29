interface depositType
{
    account: {
        agencyNumber: string;
        accountVerificationCode: string;
        accountNumber: string;
        document: string;
    };
    value: string;
}

export { depositType };
