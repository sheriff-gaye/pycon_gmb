import ModemPay from "modem-pay";

export const modempay = new ModemPay(process.env.MODEM_PAY_SECRET_KEY!);