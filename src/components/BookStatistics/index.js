import { Column } from "@ant-design/charts";

const BookStatistics = () => {
  const data = [
    {
      type: "科幻小说",
      sales: 61,
    },
    {
      type: "计算机",
      sales: 52,
    },
    {
      type: "外国文学",
      sales: 38,
    },
    {
      type: "音乐",
      sales: 38,
    },
    {
      type: "艺术",
      sales: 28,
    },
    {
      type: "当代文学",
      sales: 27,
    },
    {
      type: "物理学",
      sales: 15,
    },
    {
      type: "社会科学",
      sales: 10,
    },
  ];
  const config = {
    data: data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      type: { alias: "类别" },
      sales: { alias: "销量" },
    },
  };
  return <Column {...config} />;
};

export default BookStatistics;
