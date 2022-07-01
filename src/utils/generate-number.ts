const generateNumber = (amount: number) => {
  let numbers = '';

  for (let i = 0; i <= amount; i += 1) {
    const number = Math.floor(Math.random() * (9 - 1)) + 1;
    numbers += number;
  }

  return numbers;
};

export { generateNumber };
