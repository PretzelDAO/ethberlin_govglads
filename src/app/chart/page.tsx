"use client";

import { useRef, useEffect } from "react";
import * as echarts from "echarts";

const Page = () => {
  const ref = useRef(null);

  useEffect(() => {
    const chart = echarts.init(ref.current);
    chart.setOption({
      title: {
        text: "ECharts Getting Started Example",
      },
      tooltip: {},
      xAxis: {
        data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
      },
      yAxis: {},
      series: [
        {
          name: "sales",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <div ref={ref} className="h-80"></div>;
};

export default Page;
