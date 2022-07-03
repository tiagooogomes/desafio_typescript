interface TransferBody {
    origin: {
        account: {
            agency_number: string,
            agency_verification_code: string,
            account_verification_code: string,
            account_number: string,
            CPF: string,
            password: string
        }
    },
    destiny: {
        account: {
            agency_number: string,
            agency_verification_code: string,
            account_verification_code: string,
            account_number: string,
            CPF: string
        }
    },
    value: string
}

export { TransferBody };