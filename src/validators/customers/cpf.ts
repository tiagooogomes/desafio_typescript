import { validate } from 'gerador-validador-cpf';

class CpfValidator {
  public errors: string;
  public cpf: string;

  public constructor(cpf: string) {
    this.errors = '';
    this.cpf = this.validate(cpf);
  };

  private validate(cpf: string): string {
    if (cpf.length === 0) {
      this.errors += 'CPF: O CPF é necessário|';
      return '';
    };

    if (!validate(cpf)) {
      this.errors += 'CPF: CPF inválido| ';
      return '';
    };

    return cpf.trim();
  };
};

export { CpfValidator };
