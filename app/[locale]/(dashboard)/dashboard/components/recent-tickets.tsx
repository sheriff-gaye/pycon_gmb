// app/dashboard/components/recent-tickets.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Clock } from "lucide-react";
import { getRecentTickets } from "@/app/actions/tickets-purchase";

const RecentTickets = async () => {
  const result = await getRecentTickets(5);

  if (!result.success || result.data.length === 0) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Recent Ticket Purchases</CardTitle>
          <CardDescription>Latest 5 successful ticket sales</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No ticket purchases yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Ticket Purchases</CardTitle>
        <CardDescription>Latest 5 successful ticket sales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {result.data.map((ticket) => {
            const initials = ticket.customerName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            const ticketTypeColors = {
              STUDENTS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
              INDIVIDUAL: "bg-green-500/10 text-green-500 border-green-500/20",
              CORPORATE: "bg-purple-500/10 text-purple-500 border-purple-500/20",
            };

            return (
              <div
                key={ticket.id}
                className="flex items-center gap-4 rounded-lg  p-2 pb hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">
                      {ticket.customerName}
                    </p>
                    {ticket.isCheckedIn && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {ticket.customerEmail}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant="outline"
                    className={ticketTypeColors[ticket.ticketType]}
                  >
                    {ticket.ticketType}
                  </Badge>
                  <p className="text-sm font-semibold">
                    {ticket.currency} {ticket.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTickets;