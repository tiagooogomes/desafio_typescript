interface DepositBody {
    account: {
        agency_number: string,
        agency_verification_code: string,
        account_verification_code: string,
        account_number: string,
        CPF: string
    },
    value: number;
}

export { DepositBody }