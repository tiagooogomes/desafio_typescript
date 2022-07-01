import { validate } from 'gerador-validador-cpf';

const documentValidator = (document: string) => {
  if (!document) {
    return 'error: Documento é necessario | ';
  }

  if (!validate(document)) {
    return 'error: Ducumento inválido | ';
  }

  return document.trim();
};

export { documentValidator };
