import { Stack, Text } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import {
  ContaAReceber,
  useRelatorioFinanceiroContext,
} from "../../context/RelatorioFinanceiroContext";
import groupArray from "group-array";
import { useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

var formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function GraficoBoletos() {
  const { contaAReceber, setContaAReceber } = useRelatorioFinanceiroContext();
  const filteredContas = filterContas();
  const lists = groupArray(filteredContas, "data");
  const categorias = Object.keys(lists) || ["nothing"];
  const dadosArray = (() => {
    let array = [];
    for (const [key, value] of Object.entries(lists)) {
      console.log(key, value);
    }
    return array;
  })();

  function filterContas() {
    let filtered = [...contaAReceber];
    filtered.forEach((conta) => {
      conta.data = conta.data.slice(3, conta.data.length);
    });
    return filtered;
  }

  useEffect(() => {
    console.log(lists);
  }, [contaAReceber]);

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
      categories: categorias,
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
      data: dadosArray,
      type: "numeric",
    },
  ];

  return <Chart options={options} series={series} type="bar" width="500" />;
}
