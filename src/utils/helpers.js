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

export const imageBasePath = "http://localhost:8080/api/books/cover/";

export const getCoverUrl = (cover) => {
  return imageBasePath + cover;
};

export const getApiUrlWithDateRange = (baseUrl, startDate, endDate) => {
  if (startDate && endDate) {
    return `${baseUrl}?start=${startDate}&end=${endDate}`;
  } else {
    return baseUrl;
  }
};
