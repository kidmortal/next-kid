import { Stack, Text } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useRelatorioFinanceiroContext } from "../../context/RelatorioFinanceiroContext";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function GraficoBoletos() {
  const { contaAReceber, setContaAReceber } = useRelatorioFinanceiroContext();
  const total = Math.round(
    contaAReceber?.reduce((a, b) => a + b.valor_documento, 0)
  );

  const options: ApexOptions = {
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Boletos Pyramid",
      align: "center",
    },
    chart: {
      id: "basic-bar",
      background: "#2D3748",
    },
    xaxis: {
      categories: [2021],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatter.format(value);
        },
      },
    },
    theme: {
      mode: "dark",
      monochrome: {
        color: "#255aee",
      },
    },
    colors: ["#4299E1", "#FC8181"],
  };

  const series = [
    {
      name: "Entrada",
      data: [total],
      type: "numeric",
    },
  ];

  return <Chart options={options} series={series} type="bar" width="500" />;
}
