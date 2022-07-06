class AccountNumberValidator {
    public account_number: string;
    public errors: string;

    public constructor(account_number: string) {
        this.errors = '';
        this.account_number = this.validate(account_number);
    };

    private validate(account_number: string): string {
        if (account_number.length === 0) {
            this.errors += 'Número da Conta: O número da conta é necessário| ';
            return '';
        };

        return account_number.trim();
    };
};

export { AccountNumberValidator };