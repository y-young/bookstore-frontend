import { Column } from "@ant-design/charts";
import useRequest from "@umijs/use-request";

const BookStatistics = () => {
  const { data, loading } = useRequest("/books/sales", {
    initialData: [],
    formatResult: (response) => {
      return response.data.map((item) => ({ ...item.book, sales: item.sales }));
    },
  });
  const config = {
    xField: "title",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: false,
      },
      title: {
        text: "书名",
      },
    },
    yAxis: {
      title: {
        text: "销量(本)",
      },
    },
    meta: {
      title: { alias: "书名" },
      sales: { alias: "销量" },
    },
  };
  return <Column data={data} loading={loading} {...config} />;
};

export default BookStatistics;
