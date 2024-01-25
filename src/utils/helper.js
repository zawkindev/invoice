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

export function clearValuesOfInvoice(targetInvoice) {
  const invoice = deepClone(targetInvoice)
  if (invoice && typeof invoice === 'object') {
    for (const key in invoice) {
      invoice[key] = '';
    }
  }

  return invoice;
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj; // Return primitives as-is
  }

  if (Array.isArray(obj)) {
    // Clone arrays
    return obj.map((item) => deepClone(item));
  }

  // Clone objects
  const clonedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

export function createNewInvoiceItem(items){
  items.push({
    "name": "",
    "price": "",
    "qty": "",
    "total": ""
  })
}