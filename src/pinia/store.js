import { defineStore  } from "pinia";
import { reactive, ref } from "vue";

const invoicesData = {
  "invoices": [
    {
      "id": "XM9141",
      "date": "2006-04-22",
      "fullName": "Alex Grim",
      "email": "alexgrim@gmail.com",
      "money": 102.04,
      "status": "pending",
      "serviceType": "Graphic Design",
      "invoiceDate": "2001-03-23",
      "paymentDue": "2004-12-03",
      "buyer": {
        "address": "19 Union Terrace",
        "city": "London",
        "postalCode": "E1 3EZ",
        "country": "United Kingdom"
      },
      "seller": {
        "address": "6 Avaz O'tar",
        "city": "Bradford",
        "postalCode": "BD1 9PB",
        "country": "United Kingdom"
      },
      "items": [
        {
          "name": "Banner Design",
          "qty": "2",
          "price": "200",
          "total": "200"
        }
      ],
      "amount": "400"
    },
    {
      "id": "AB5678",
      "date": "2022-05-15",
      "fullName": "Emma Smith",
      "email": "emma.smith@gmail.com",
      "money": 150.75,
      "status": "paid",
      "serviceType": "Web Development",
      "invoiceDate": "2022-04-10",
      "paymentDue": "2022-06-01",
      "buyer": {
        "address": "25 Park Avenue",
        "city": "New York",
        "postalCode": "10001",
        "country": "United States"
      },
      "seller": {
        "address": "123 Tech Street",
        "city": "San Francisco",
        "postalCode": "94105",
        "country": "United States"
      },
      "items": [
        {
          "name": "Website Redesign",
          "qty": "1",
          "price": "800",
          "total": "800"
        },
        {
          "name": "Hosting Service",
          "qty": "1",
          "price": "50",
          "total": "50"
        }
      ],
      "amount": "850"
    }
  ]
};



export const useInvoiceStore = defineStore("invoices", () => {
  const invoices = reactive(invoicesData.invoices);

  function getData(){
    return invoices
  }

  function getInvoice (invoiceID){
    console.log("85: ",invoiceID)
    const invoice = invoices.find((item) => item.id === invoiceID);
    return invoice;
  };

  function getInvoiceItems (invoiceID) {
    const invoice = getInvoice(invoiceID);
    return invoice.items;
  };


  return { invoices, getData, getInvoice, getInvoiceItems };
});
