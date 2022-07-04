import {
    AccountNumberValidator,
    AgencyNumberValidator,
    AccountCodeValidator,
    AgencyCodeValidator,
    valueValidator,
} from './accounts';
import { CpfValidator, PasswordValidator } from './customers';
import { TransferBody } from '../models';

class TransferValidator {

    public account: TransferBody;
    public errors: string;

    public constructor(body: TransferBody) {
        this.errors = '';
        this.account = this.validate(body);
    };

    private validate(body: TransferBody): TransferBody {
        const validOriginAccountCode = new AccountCodeValidator(body.originAccount.account_verification_code);
        const validOriginAgencyCode = new AgencyCodeValidator(body.originAccount.agency_verification_code);
        const validOriginAccountNumber = new AccountNumberValidator(body.originAccount.account_number);
        const validOriginAgencyNumber = new AgencyNumberValidator(body.originAccount.agency_number);
        const validOriginPassword = new PasswordValidator(body.originAccount.password);
        const validOriginCpf = new CpfValidator(body.originAccount.CPF);

        const validDestinyAccountCode = new AccountCodeValidator(body.destinyAccount.account_verification_code);
        const validDestinyAgencyCode = new AgencyCodeValidator(body.destinyAccount.agency_verification_code);
        const validDestinyAccountNumber = new AccountNumberValidator(body.destinyAccount.account_number);
        const validDestinyAgencyNumber = new AgencyNumberValidator(body.destinyAccount.agency_number);
        const validDestinyCpf = new CpfValidator(body.destinyAccount.CPF);

        const validValue = new valueValidator(body.value);

        this.errors = this.errors.concat(
            `${validOriginAccountCode.errors}${validOriginAgencyCode.errors}${validOriginAccountNumber.errors}${validOriginAgencyNumber.errors}${validOriginCpf.errors}${validValue.errors}${validDestinyAccountCode.errors}${validDestinyAgencyCode.errors}${validDestinyAccountNumber.errors}${validDestinyAgencyNumber.errors}${validDestinyCpf.errors}${validOriginPassword.errors}`,
        );

        const accountData: TransferBody = {
            originAccount: {
                agency_verification_code: validOriginAgencyCode.agencyCodeVerification,
                account_verification_code: validOriginAccountCode.accountVerification,
                account_number: validOriginAccountNumber.account_number,
                agency_number: validOriginAgencyNumber.agency_number,
                password: validOriginPassword.password,
                CPF: validOriginCpf.cpf
            },
            destinyAccount: {
                agency_verification_code: validDestinyAgencyCode.agencyCodeVerification,
                account_verification_code: validDestinyAccountCode.accountVerification,
                account_number: validDestinyAccountNumber.account_number,
                agency_number: validDestinyAgencyNumber.agency_number,
                CPF: validDestinyCpf.cpf
            },
            value: validValue.value
        };

        return accountData;
    };
};

export { TransferValidator };
