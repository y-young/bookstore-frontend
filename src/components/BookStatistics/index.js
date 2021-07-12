import { Column } from "@ant-design/charts";
import useRequest from "@umijs/use-request";
import { Col, Pagination, Row } from "antd";
import { useEffect } from "react";
import {
  formatPaginatedResult,
  getApiUrlWithDateRange,
  getPaginatedApiUrl,
} from "utils/helpers";

const BookStatistics = ({ startDate, endDate }) => {
  const { run, data, pagination } = useRequest(
    ({ current, pageSize }, startDate, endDate) =>
      getApiUrlWithDateRange(
        getPaginatedApiUrl("/books/sales", current, pageSize),
        startDate,
        endDate
      ),
    {
      initialData: {
        list: [],
        total: 0,
      },
      formatResult: (response) => {
        return formatPaginatedResult({
          ...response,
          data: {
            ...response.data,
            content: response.data.content.map((item) => ({
              ...item.book,
              sales: item.sales,
            })),
          },
        });
      },
      manual: true,
      paginated: true,
      defaultPageSize: 7,
    }
  );

  useEffect(() => {
    run({ current: 1, pageSize: 7 }, startDate, endDate);
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
  return (
    <>
      <Column data={data?.list} {...config} />
      <Row justify="end">
        <Col>
          <Pagination {...pagination} />
        </Col>
      </Row>
    </>
  );
};

export default BookStatistics;
