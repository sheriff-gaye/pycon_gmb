// app/dashboard/components/dashboard-cards.tsx
import { countContacts } from "@/app/actions/list-newsletters";
import { getActiveSponsorsCount } from "@/app/actions/sponsors";
import {
  getTotalSuccessfulAmount,
  numberofTickets,
} from "@/app/actions/tickets-purchase";
import { getActiveSpeakersCount } from "@/app/actions/speakers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  Mic2,
  UserCheck,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { getFrontdeskStaffCount } from "@/app/actions/frontdesk";
import { getCheckInStats } from "@/app/actions/mobile-app";
import { getActiveProductsCount } from "@/app/actions/products";

const DashboardCards = async () => {
  // Fetch all data in parallel for better performance
  const [
    membersCount,
    tickets,
    ticketSales,
    sponsors,
    speakers,
    frontdeskStaff,
    checkInStats,
    productsCount,    
  ] = await Promise.all([
    countContacts(),
    numberofTickets(),
    getTotalSuccessfulAmount(),
    getActiveSponsorsCount(),
    getActiveSpeakersCount(),
    getFrontdeskStaffCount(),
    getCheckInStats(),
    getActiveProductsCount()
  ]);

  const checkInRate = checkInStats.success ? checkInStats.data.checkInRate : 0;
  const checkedInCount = checkInStats.success ? checkInStats.data.checkedIn : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {/* Total Registered Members */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Registered Members
          </CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{membersCount}</div>
          <p className="text-xs text-muted-foreground">
            Newsletter subscribers
          </p>
        </CardContent>
      </Card>

      {/* Successful Tickets */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tickets Sold
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets}</div>
          <p className="text-xs text-muted-foreground">
            Completed purchases
          </p>
        </CardContent>
      </Card>

      {/* Ticket Sales Revenue */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            GMD {ticketSales.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            From ticket sales
          </p>
        </CardContent>
      </Card>

      {/* Check-in Rate */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Number of Products </CardTitle>
          <UserCheck className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{productsCount}</div>
          <p className="text-xs text-muted-foreground">
            {productsCount} Products in our store
          </p>
        </CardContent>
      </Card>

      {/* Total Speakers */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Speakers
          </CardTitle>
          <Mic2 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{speakers}</div>
          <p className="text-xs text-muted-foreground">
            Confirmed speakers
          </p>
        </CardContent>
      </Card>

      {/* Frontdesk Staff */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Frontdesk Staff
          </CardTitle>
          <UserCheck className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{frontdeskStaff}</div>
          <p className="text-xs text-muted-foreground">
            Active staff members
          </p>
        </CardContent>
      </Card>

      {/* Total Sponsors */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
          <Activity className="h-4 w-4 text-pink-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sponsors}</div>
          <p className="text-xs text-muted-foreground">
            Event sponsors
          </p>
        </CardContent>
      </Card>

      {/* Average Ticket Price */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue from store</CardTitle>
          <TrendingUp className="h-4 w-4 text-cyan-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
           0
          </div>
          <p className="text-xs text-muted-foreground">
            Revenue from product sales
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;