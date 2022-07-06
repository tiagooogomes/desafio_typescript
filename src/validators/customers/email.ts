class EmailValidator {
  private regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
  public errors: string;
  public email: string;

  public constructor(email: string) {
    this.errors = '';
    this.email = this.validate(email);
  };

  private validate(email: string): string {
    if (email.length === 0) {
      this.errors += 'Email: O email é necessário| ';
      return '';
    };

    if (!this.regex.test(email)) {
      this.errors += 'Email: Email inválido| ';
      return '';
    };

    return email.trim();
  };
};

export { EmailValidator };
