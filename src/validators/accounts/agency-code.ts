class AgencyCodeValidator {
    public agencyCodeVerification: string;
    public errors: string;

    public constructor(agencyCodeVerification: string) {
        this.errors = '';
        this.agencyCodeVerification = this.validate(agencyCodeVerification);
    };

    private validate(agencyCodeVerification: string): string {
        if (agencyCodeVerification.length === 0) {
            this.errors += 'Código da Agência: O código da agência é necessário| ';
            return '';
        };

        return agencyCodeVerification.trim();
    };
};

export { AgencyCodeValidator };