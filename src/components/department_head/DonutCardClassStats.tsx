import { DonutChart, Legend } from "@tremor/react";

type ClassData = {
  className: string;
  totalSecciones: number;
  totalEnrollments: number;
  totalAprobados: number;
  totalReprobados: number;
  porcentajeAprobados: number;
  porcentajeReprobados: number;
  promedioNotas: number;
};

type ClassDonutChartProps = {
  data: ClassData[];
};

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number)}%`;

export function DonutCardClassStats({ data }: ClassDonutChartProps) {
  return (
    <>
      {data.map((classItem, index) => {
        const chartData = [
          {
            name: "Aprobados",
            value: classItem.porcentajeAprobados,
          },
          {
            name: "Reprobados",
            value: classItem.porcentajeReprobados,
          },
        ];

        const colors = ["green", "red"];

        return (
          <div key={index} className="m-4 p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-center text-lg font-semibold mb-4">
              {classItem.className}
            </h2>
            <DonutChart
              data={chartData}
              category="value"
              index="name"
              valueFormatter={valueFormatter}
              colors={colors}
              className="w-40"
            />
            <Legend
              categories={["Aprobados", "Reprobados"]}
              colors={colors}
              className="max-w-xs mt-4"
            />
          </div>
        );
      })}
    </>
  );
}
