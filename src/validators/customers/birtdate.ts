class DateValidator {
  public errors: string;
  public date: string;

  public constructor(date: string) {
    this.errors = '';
    this.date = this.validate(date);
  };

  private validate(date: string): string {
    if (!date) {
      this.errors += 'Nascimento: A data de nascimento é necessária| ';
      return '';
    };

    if (!new Date(date).getTime()) {
      this.errors += 'Nascimento: Data de nascimento inválida| ';
      return '';
    };

    if (new Date(date) > new Date()) {
      this.errors += 'Nascimento: A data de nascimento incoerente| ';
      return '';
    };

    return date.trim();
  };
};

export { DateValidator };
