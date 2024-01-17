import data from "./data.json"

export function getData() {
  return data.invoices;
}

export function getInvoice(targetID) {
  const target = data.invoices.find(item=>item.id===targetID)
  return target
}

