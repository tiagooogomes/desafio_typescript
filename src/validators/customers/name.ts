class NameValidator {
  public errors: string;
  public name: string;

  public constructor(name: string) {
    this.errors = '';
    this.name = this.validate(name);
  };

  private validate(name: string): string {
    if (!name) {
      this.errors += 'Nome: O nome é necessário| ';
      return '';
    };

    if (name.trim().length < 4) {
      this.errors += 'Nome: O nome deve ter mais de 4 caractéres| ';
      return '';
    };

    if (!name.trim()) {
      this.errors += 'Nome: Não pode haver espaço entre os caracteres| ';
      return '';
    };

    return name.trim();
  };
};

export { NameValidator };
