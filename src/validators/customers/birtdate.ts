class DateValidator {
  public errors: string;
  public date: string;

  public constructor(date: string) {
    this.errors = '';
    this.date = this.validate(date);
  };

  private validate(date: string): string {
    if (!date) {
      this.errors += 'birthdate: field required';
      return '';
    };

    if (!new Date(date).getTime()) {
      this.errors += 'birthdate: invalid date|';
      return '';
    };

    if (new Date(date) > new Date()) {
      this.errors += 'birthdate: cannot be a future date|';
      return '';
    };

    return date.trim();
  };
};

export { DateValidator };
