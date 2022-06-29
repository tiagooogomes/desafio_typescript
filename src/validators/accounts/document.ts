import { validate } from 'gerador-validador-cpf';

const documentValidator = (document: string) => {
  if (!document) {
    return 'error: document required | ';
  }

  if (!validate(document)) {
    return 'error: invalid document | ';
  }

  return document.trim();
};

export { documentValidator };
