import data from "./data.json"

export function getData() {
  return data.invoices;
}

export function getInvoice(targetID) {
  const invoice = data.invoices.find(item=>item.id===targetID)
  return invoice
}

export function getInvoiceItems(targetID){
  const invoice = getInvoice(targetID)
  return invoice.items
}
