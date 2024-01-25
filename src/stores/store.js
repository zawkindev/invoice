import {defineStore} from "pinia";
import {cloneDeep} from 'lodash';
import {ref} from "vue";
import {clearValuesOfInvoice, createNewInvoiceItem, generateID} from "../utils/helper.js";

const invoicesData = {
  "invoices": [
    {
      "id": "XM9141",
      "date": "2006-04-22",
      "fullName": "Alex Grim",
      "email": "alexgrim@gmail.com",
      "amount": "400",
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
          "id": "KJ2983",
          "name": "Banner Design",
          "qty": "2",
          "price": "200",
          "total": "200"
        }
      ],
    },
    {
      "id": "AB5678",
      "date": "2022-05-15",
      "fullName": "Emma Smith",
      "amount": "850",
      "email": "emma.smith@gmail.com",
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
          "id": "KG7840",
          "name": "Website Redesign",
          "qty": "1",
          "price": "800",
          "total": "800"
        },
        {
          "id": "TR9872",
          "name": "Hosting Service",
          "qty": "1",
          "price": "50",
          "total": "50"
        }
      ],
    }
  ],
  "emptyInvoice": {
    "id": "",
    "date": "",
    "fullName": "",
    "email": "",
    "amount": "",
    "status": "",
    "serviceType": "",
    "invoiceDate": "",
    "paymentDue": "",
    "buyer": "",
    "seller": "",
    "items": [],
  }
};


export const useInvoiceStore = defineStore("invoices", () => {
      const invoices = ref(invoicesData.invoices);
      const emptyInvoice = ref(invoicesData.emptyInvoice)
      const editingInvoice = ref('')
      const checkedStatus = ref('status')
      const isDarkTheme = ref(true)

      function getInvoicesList() {
        return invoices
      }

      function getInvoice(invoiceID) {
        return invoices.value.find((item) => item.id === invoiceID);
      }

      function getEmptyInvoice() {
        emptyInvoice.value.id = generateID()
        emptyInvoice.value.status = 'draft'
        emptyInvoice.value.money = 0
        if (emptyInvoice.value.items.length === 0) {
          emptyInvoice.value.items = []
          createNewInvoiceItem(emptyInvoice.value.items)
        }
        if (emptyInvoice.value.buyer === "") {
          emptyInvoice.value.buyer = {
            "address": "",
            "city": "",
            "postalCode": "",
            "country": ""
          }
        }
        if (emptyInvoice.value.seller === "") {
          emptyInvoice.value.seller = {
            "address": "",
            "city": "",
            "postalCode": "",
            "country": ""
          }
        }
        return emptyInvoice.value
      }

      function getEditingInvoice(invoiceID) {
        editingInvoice.value = cloneDeep(invoices.value.find((item) => item.id === invoiceID));
        return editingInvoice.value
      }

      function getInvoiceIndex(invoiceID) {
        return invoices.value.findIndex(el => el.id === invoiceID)
      }

      function getInvoiceItems(invoiceID) {
        const invoice = getInvoice(invoiceID);
        return invoice.items;
      }

      function deleteInvoice(invoiceID) {
        const invoiceIndex = getInvoiceIndex(invoiceID)
        invoices.value.splice(invoiceIndex, 1)
      }

      function markAs(invoiceID, statusType) {
        const invoiceIndex = getInvoiceIndex(invoiceID)
        invoices.value[invoiceIndex].status = statusType
      }

      function filterByStatus(targetStatus) {
        if (targetStatus === 'status') {
          return invoices.value
        }
        console.log("filtered: ", invoices.value.filter(item => item.status === targetStatus.toLowerCase()))
        return invoices.value.filter(item => item.status === targetStatus.toLowerCase())
      }

      function replaceInvoice(invoiceID, newInvoice) {
        const index = getInvoiceIndex(invoiceID)
        if (index !== -1) {
          invoices.value.splice(index, 1, cloneDeep(newInvoice));
          clearEmptyInvoice()
        }
      }

      function addInvoice(newInvoice) {
        invoices.value.push(cloneDeep(newInvoice))
        clearEmptyInvoice()
      }

      function clearEmptyInvoice() {
        emptyInvoice.value = clearValuesOfInvoice(emptyInvoice.value)
        editingInvoice.value = clearValuesOfInvoice(editingInvoice.value)
      }


      return {
        invoices,
        emptyInvoice,
        editingInvoice,
        checkedStatus,
        isDarkTheme,
        getInvoicesList,
        getInvoice,
        getEmptyInvoice,
        getInvoiceItems,
        getEditingInvoice,
        addInvoice,
        deleteInvoice,
        replaceInvoice,
        clearEmptyInvoice,
        markAs,
        filterByStatus
      };
    }
  )
;
