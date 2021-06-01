import { Column } from "@ant-design/charts";
import useRequest from "@umijs/use-request";
import { useEffect } from "react";

const baseApiUrl = "/books/sales";

const BookStatistics = ({ startDate, endDate }) => {
  const { run, data } = useRequest(
    (url) => url,
    {
      initialData: [],
      formatResult: (response) => {
        return response.data.map((item) => ({
          ...item.book,
          sales: item.sales,
        }));
      },
    },
    { manual: true }
  );

  useEffect(() => {
    let apiUrl;
    if (startDate && endDate) {
      apiUrl = `${baseApiUrl}?start=${startDate}&end=${endDate}`;
    } else {
      apiUrl = baseApiUrl;
    }
    run(apiUrl);
  }, [startDate, endDate, run]);

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
  return <Column data={data} {...config} />;
};

export default BookStatistics;
