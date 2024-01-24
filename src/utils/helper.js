export function formatDate(date) {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.toLocaleString("default", {month: "long"});
  const year = dateObject.getFullYear();

  return ` ${day} ${month.slice(0, 3)} ${year}`;
}

export function formatMoney(amount) {
  const amountString = amount.toString();
  if (amountString.includes(".")) {
    const [integerPart, decimalPart] = amountString.split(".");
    const formattedDecimalPart = decimalPart.padEnd(2, "0");

    return `${integerPart}.${formattedDecimalPart}`;
  } else {
    return `${amountString}.00`;
  }
}

export function generateID() {
  // Generate two uppercase letters
  const letters = Array.from({length: 2}, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('');

  // Generate four random numbers
  const numbers = Array.from({length: 4}, () =>
    Math.floor(Math.random() * 10)
  ).join('');

  // Combine letters and numbers
  return `${letters}${numbers}`;
}

export function clearValuesOfInvoice(invoice) {
  // Ensure the provided argument is an object
  if (invoice && typeof invoice === 'object') {
    // Iterate through each key in the provided invoice
    for (const key in invoice) {
      // Set the value of the key to null
      invoice[key] = '';
    }
  }

  return invoice;
}
