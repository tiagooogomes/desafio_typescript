const birthdateValidator = (birthdate: string) => {
  if (!birthdate) {
    return 'error: birthdate required | ';
  }

  if (!new Date(birthdate).getTime()) {
    return 'error: invalid date | ';
  }

  return birthdate.trim();
};

export { birthdateValidator };
