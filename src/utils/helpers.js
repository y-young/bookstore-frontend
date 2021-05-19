export const currencyFormat = (amount) => {
  amount = amount / 100;
  const decimal = amount % 1;
  const integerString = (amount - decimal).toLocaleString();
  const decimalString = decimal.toFixed(2).toString().slice(1);
  return "￥" + integerString + decimalString;
};

export const totalSum = (items) => {
  let total = 0;
  items.forEach((item) => {
    const { book, amount } = item;
    total += book.price * amount;
  });
  return total;
};

export const totalAmount = (items) => {
  return items.map((item) => item.amount).reduce((prev, curr) => prev + curr);
};
