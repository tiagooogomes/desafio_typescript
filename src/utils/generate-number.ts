const generateNumber = (amount: number) => {
  const number = Math.floor(Math.random() * (9 - 1)) + 1;
  let numbers = '';

  for (let i = 0; i <= amount; i += 1) {
    numbers += number;
  }

  return numbers;
};

export { generateNumber };
