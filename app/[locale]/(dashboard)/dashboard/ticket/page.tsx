import { getTickets } from "@/app/actions/tickets-purchase";
import TicketPurchasesTable from "./table";

const TicketPurchasesPage = async () => {
  const purchases = await getTickets();
  return (
    <div className="p-4 mt-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <TicketPurchasesTable purchases={purchases} />
      </main>
    </div>
  );
};

export default TicketPurchasesPage;
