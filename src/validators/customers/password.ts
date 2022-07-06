class PasswordValidator {
  public password: string;
  public errors: string;

  public constructor(password: string) {
    this.errors = '';
    this.password = this.validate(password);
  };

  private validate(password: string): string {
    if (!password) {
      this.errors += 'Senha: A senha é necessária| ';
      return '';
    };

    if (password.trim().length < 5) {
      this.errors += 'Senha: A senha teve ter mais no mínimo 4 caracteres| ';
      return '';
    };

    if (password.trim().length > 10) {
      this.errors += 'Senha: A senha só ter no maximo 10 caracteres| ';
      return '';
    };

    if (!password.trim()) {
      this.errors += 'Senha: Não pode haver espaço entre os caracteres| ';
      return '';
    };

    return password.trim();
  };
};

export { PasswordValidator };
