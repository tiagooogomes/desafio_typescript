class AccountCodeValidator {
    public accountVerification: string;
    public errors: string;

    public constructor(accountVerification: string) {
        this.errors = '';
        this.accountVerification = this.validate(accountVerification);
    };

    private validate(accountVerification: string): string {
        if (accountVerification.length === 0) {
            this.errors += 'Códido da Conta: O código da conta é necessário| ';
            return '';
        };

        return accountVerification.trim();
    };
};

export { AccountCodeValidator };
