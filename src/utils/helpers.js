export const currencyFormat = (amount) => {
  const decimal = amount % 1;
  const integerString = (amount - decimal).toLocaleString();
  const decimalString = decimal
    .toFixed(2)
    .toString()
    .slice(1);
  return "￥" + integerString + decimalString;
};

export const totalSum = (books) => {
  let total = 0;
  books.forEach((book) => {
    const amount = book.amount ? book.amount : 1; // FIXME
    total += book.price * amount;
  });
  return total;
};
