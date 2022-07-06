class valueValidator {
    public errors: string;
    public value: number;

    public constructor(value: number) {
        this.errors = '';
        this.value = this.validate(value);
    };

    private validate(value: number): number {

        if(Number.isNaN(value)){
            this.errors += 'Valor: Formato incoerente| ';
            return 0;
        };

        if (value <= 0) {
            this.errors += 'Valor: Valor não positívo não é permitido| ';
            return 0;
        };

        return value;
    };
};

export { valueValidator };
