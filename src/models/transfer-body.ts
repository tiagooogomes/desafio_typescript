interface TransferBody {
    originAccount: {
        agency_number: string,
        agency_verification_code: string,
        account_verification_code: string,
        account_number: string,
        CPF: string,
        password: string
    },
    destinyAccount: {
        agency_number: string,
        agency_verification_code: string,
        account_verification_code: string,
        account_number: string,
        CPF: string
    },
    value: number
}

export { TransferBody };