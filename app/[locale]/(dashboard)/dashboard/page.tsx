// app/dashboard/page.tsx
import { Suspense } from "react";
import RecentTickets from "./components/recent-tickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCards from "./components/dahboard-cards";
import TicketCharts from "./components/ticket-chart";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 z-[10]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
         
        </div>
      </div>

      <Suspense fallback={<DashboardCardsSkeleton />}>
        <DashboardCards />
      </Suspense>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <TicketCharts />
        </Suspense>

        <Suspense fallback={<TableSkeleton />}>
          <RecentTickets />
        </Suspense>
      </div>
    </main>
  );
};

// Loading Skeletons
function DashboardCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[150px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
}

function TableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[150px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Dashboard;