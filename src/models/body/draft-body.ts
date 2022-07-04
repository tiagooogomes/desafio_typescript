interface DraftBody {
    account: {
        account_verification_code: string;
        agency_verification_code: string;
        account_number: string;
        agency_number: string;
        password: string;
        CPF: string;
    };
    value: number;
};

export { DraftBody };