const apiBasePath = "http://localhost:8080";

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

export const imageBasePath = apiBasePath + "/books/cover/";

export const getCoverUrl = (cover) => {
  return imageBasePath + cover;
};

export const getApiUrlWithDateRange = (baseUrl, startDate, endDate) => {
  const url = new URL(baseUrl, apiBasePath);
  const params = url.searchParams;
  if (startDate && endDate) {
    params.append("start", startDate);
    params.append("end", endDate);
  } else {
    params.append("start", "");
    params.append("end", "");
  }
  return `${url.pathname}?${params.toString()}`;
};

export const getPaginatedApiUrl = (baseUrl, currentPage, pageSize) => {
  const url = new URL(baseUrl, apiBasePath);
  const params = url.searchParams;
  params.append("page", currentPage - 1);
  params.append("size", pageSize);
  return `${url.pathname}?${params.toString()}`;
};

export const formatPaginatedResult = (response) => {
  const { data } = response;
  if (!data) {
    return {
      list: [],
      total: 0,
    };
  }
  return {
    list: data.content,
    total: data.totalElements,
  };
};

export const colorMapping = (key) => {
  const colors = [
    "magenta",
    "lime",
    "orange",
    "green",
    "red",
    "gold",
    "volcano",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  return colors[key % colors.length];
};
