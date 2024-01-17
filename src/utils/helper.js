export function formatDate(date) {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.toLocaleString("default", { month: "long" });
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
