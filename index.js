import { program } from "commander";

import * as contactsList from "./db/contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsList.listContacts();
      return console.log(allContacts);

    case "get":
      const contactById = await contactsList.getContactById(id);
      return console.log(contactById);

    case "add":
      const addContact = await contactsList.addContact(name, email, phone);
      return console.log(addContact);

    case "remove":
      const contactRemove = await contactsList.removeContact(id);
      return console.log(contactRemove);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "vza2RIzNGIwutCVCs4mCL" });
// invokeAction({ action: "remove", id: "vza2RIzNGIwutCVCs4mCL" });
invokeAction({ action: "add", name: "test", email: "test", phone: "test" });
