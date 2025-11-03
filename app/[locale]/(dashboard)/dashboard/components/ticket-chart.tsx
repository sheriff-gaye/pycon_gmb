// app/dashboard/components/ticket-charts.tsx
"use client";

import { useEffect, useState } from "react";
import { getCheckInStats } from "@/app/actions/mobile-app";
import { getTicketTypeDistribution } from "@/app/actions/tickets-purchase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";

const COLORS = {
  STUDENTS: "hsl(var(--chart-1))",
  INDIVIDUAL: "hsl(var(--chart-2))",
  CORPORATE: "hsl(var(--chart-3))",
  checkedIn: "hsl(var(--chart-2))",
  notCheckedIn: "hsl(var(--chart-4))",
} as const;

interface TicketTypeData {
  name: string;
  value: number;
  revenue: number;
  fill: string;
}

interface CheckInData {
  name: string;
  value: number;
  fill: string;
}

const ticketTypeChartConfig = {
  value: {
    label: "Tickets",
  },
  STUDENTS: {
    label: "Students",
    color: "hsl(var(--chart-1))",
  },
  INDIVIDUAL: {
    label: "Individual",
    color: "hsl(var(--chart-2))",
  },
  CORPORATE: {
    label: "Corporate",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const checkInChartConfig = {
  value: {
    label: "Attendees",
  },
  checkedIn: {
    label: "Checked In",
    color: "hsl(var(--chart-2))",
  },
  notCheckedIn: {
    label: "Not Checked In",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const TicketCharts = () => {
  const [ticketTypeData, setTicketTypeData] = useState<TicketTypeData[]>([]);
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeDistribution, stats] = await Promise.all([
          getTicketTypeDistribution(),
          getCheckInStats(),
        ]);

        if (typeDistribution.success) {
          const formattedData = typeDistribution.data.map((item) => ({
            name: item.type,
            value: item.count,
            revenue: item.revenue,
            fill: COLORS[item.type as keyof typeof COLORS] || "hsl(var(--chart-1))",
          }));
          setTicketTypeData(formattedData);
        }

       
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ticket Type Distribution</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-sm text-muted-foreground">Loading chart...</p>
            </div>
          </CardContent>
        </Card>
       
      </>
    );
  }

  return (
    <>
      {/* Ticket Type Distribution */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Ticket Type Distribution</CardTitle>
          <CardDescription>
            Breakdown of tickets sold by type
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ticketTypeData.length > 0 ? (
            <div className="space-y-4">
              <ChartContainer
                config={ticketTypeChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={ticketTypeData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {ticketTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>

              {/* Legend with stats */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                {ticketTypeData.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center gap-1 rounded-lg border p-2"
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.value} tickets
                    </span>
                    <span className="text-xs text-muted-foreground">
                      GMD {item.revenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No ticket data available
              </p>
            </div>
          )}
        </CardContent>
      </Card>

   
    </>
  );
};

export default TicketCharts;