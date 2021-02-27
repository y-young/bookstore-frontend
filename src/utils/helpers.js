export const currencyFormat = (amount) => {
  return "￥" + amount.toFixed(2).toLocaleString();
};

export const totalSum = (books) => {
  let total = 0;
  books.forEach((book) => {
    total += book.price;
  });
  return total;
};
