import { DataClassesStats } from "@/types/department_head";
import { Card, Text, BarChart } from "@tremor/react";
import { DonutCardClassStats } from "./DonutCardClassStats";

export default function Dashboard({ data }: { data: DataClassesStats }) {
  // Preparamos los datos para el gráfico de barras
  const chartData = data.map((item) => ({
    className: item.className,
    "Aprobados (%)": item.porcentajeAprobados,
    "Reprobados (%)": item.porcentajeReprobados,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
        <Text className="text-center">
          Porcentaje de Aprobados y Reprobados por Clase
        </Text>
        <BarChart
          className="mt-4"
          data={chartData}
          index="className"
          categories={["Aprobados (%)", "Reprobados (%)"]}
          colors={["green", "red"]}
          valueFormatter={(number) => `${number}%`}
          yAxisWidth={50}
        />
      </Card>
      <DonutCardClassStats data={data} />
    </div>
  );
}
