const birthdateValidator = (birthdate: string) => {
  if (!birthdate) {
    return 'error: Data de nascimento é necessário | ';
  }

  if (!new Date(birthdate).getTime()) {
    return 'error: Data de nascimento inválida | ';
  }

  return birthdate.trim();
};

export { birthdateValidator };
