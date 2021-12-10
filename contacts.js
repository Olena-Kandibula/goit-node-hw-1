const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const updateContacts = require("./updateContacts");
const contactsPath = require("./contactsPath");

async function listContacts() {

    try {    
        const contacts = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(contacts);  
        return contactsList;

         } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();        
        const result = contacts.find(item => item.id === contactId); 
        if (!result) {
            return null;
        }
        return result;
        
    } catch (err) {
        console.error(err)
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();        
        const idx = contacts.findIndex(item => item.id === contactId);         
        if (idx === -1) {
            return null;
        }
        const result = contacts.filter((_, index) => index !== idx);      
        
        await updateContacts(result);      
        return contacts[idx];
        
        
    } catch (err) {
        console.error(err)
    } 
}

async function addContact(name, email, phone) {    
    try {
        const newContact = { id: v4(), name, email, phone };
        const contacts = await listContacts();        
        contacts.push(newContact);
        await updateContacts(contacts); 
        return newContact;
        
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    listContacts,
    getContactById,  
    removeContact,  
    addContact  
}