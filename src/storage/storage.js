import { getData } from "../services/api";

export function getInvoice(targetID) {
  const storageData = fetchDataFromLocalStorage();
  const invoice = storageData.find((item) => item.id === targetID);
  console.log("invoice data: ", invoice)
  return invoice;
}

export function getInvoiceItems(targetID) {
  const invoice = getInvoice(targetID);
  return invoice.items;
}

export function setDataToLocalStorage(data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem("invoice", serializedData);
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
}

export function fetchDataFromLocalStorage() {
  const Data = getData();
  try {
    const serializedData = localStorage.getItem("invoice");
    if (serializedData === null) {
      return Data;
    }

    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error fetching data from local storage:", error);

    return null;
  }
}
