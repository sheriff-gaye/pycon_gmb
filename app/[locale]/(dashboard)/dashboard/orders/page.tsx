import { getOrders } from "@/app/actions/orders";
import OrdersTable from "./table";

const OrdersPage = async () => {
  const orders = await getOrders();
  
  return (
    <div className="p-4 mt-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <OrdersTable orders={orders} />
      </main>
    </div>
  );
};

export default OrdersPage;