interface DraftBody {
    account: {
        agency_number: string,
        agency_verification_code: string,
        account_verification_code: string,
        account_number: string,
        CPF: string,
        password: string
    },
    value: number;
}

export { DraftBody }