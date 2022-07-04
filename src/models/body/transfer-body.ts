interface TransferBody {
    originAccount: {
        account_verification_code: string;
        agency_verification_code: string;
        account_number: string;
        agency_number: string;
        password: string;
        CPF: string;
    };
    destinyAccount: {
        account_verification_code: string;
        agency_verification_code: string;
        account_number: string;
        agency_number: string;
        CPF: string;
    };
    value: number;
};

export { TransferBody };