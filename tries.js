class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    delete(word) {
        this._delete(this.root, word, 0);
    }

    _delete(node, word, index) {
        if (index === word.length) {
            if (!node.isEndOfWord) return false;
            node.isEndOfWord = false;
            return Object.keys(node.children).length === 0;
        }

        let char = word[index];
        if (!node.children[char]) return false;

        let shouldDeleteCurrentNode = this._delete(node.children[char], word, index + 1);

        if (shouldDeleteCurrentNode) {
            delete node.children[char];
            return Object.keys(node.children).length === 0;
        }

        return false;
    } 
}

const trie = new Trie();
const contacts = [];

function insertContact() {
    const newContactNameInput = document.getElementById("newContactName");
    const newContactNumberInput = document.getElementById("newContactNumber");

    const contactName = newContactNameInput.value.trim();
    const contactNumber = newContactNumberInput.value.trim();

    if (contactName !== "" && contactNumber !== "") {
        const contact = { name: contactName, number: contactNumber };
        contacts.push(contact);
        trie.insert(contactName.toLowerCase()); 
        updateContactList();
        newContactNameInput.value = "";
        newContactNumberInput.value = "";
    }
}

function deleteContact() {
    const deleteContactNameInput = document.getElementById("deleteContactName");
    const contactNameToDelete = deleteContactNameInput.value.trim();

    if (contactNameToDelete !== "") {
        trie.delete(contactNameToDelete.toLowerCase()); 
        const indexToDelete = contacts.findIndex(contact => contact.name.toLowerCase() === contactNameToDelete.toLowerCase());
        if (indexToDelete !== -1) {
            contacts.splice(indexToDelete, 1);
            updateContactList();
            deleteContactNameInput.value = "";
        } else {
            alert("Contact not found!");
        }
    }
}

function searchContacts() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim().toLowerCase();
    const contactList = document.getElementById("contactList");

    while (contactList.firstChild) {
        contactList.removeChild(contactList.firstChild);
    }

    const matchingContacts = getMatchingContacts(searchTerm);

    matchingContacts.forEach(contact => {
        const li = document.createElement("li");
        li.textContent = `${contact.name} - ${contact.number}`;
        contactList.appendChild(li);
    });
}

function updateContactList() {
    const contactList = document.getElementById("contactList");
    while (contactList.firstChild) {
        contactList.removeChild(contactList.firstChild);
    }

    contacts.forEach(contact => {
        const li = document.createElement("li");
        li.textContent = `${contact.name} - ${contact.number}`;
        contactList.appendChild(li);
    });
}

function getMatchingContacts(prefix) {
    const matchingContacts = [];
    const collectContacts = (node, currentPrefix) => {
        if (node.isEndOfWord) {
            const matchingContact = contacts.find(contact => contact.name.toLowerCase() === currentPrefix);
            if (matchingContact) {
                matchingContacts.push(matchingContact);
            }
        }

        for (let char in node.children) {
            collectContacts(node.children[char], currentPrefix + char);
        }
    };

    let node = trie.root;
    for (let char of prefix) {
        if (!node.children[char]) {
            return [];
        }
        node = node.children[char];
    }

    collectContacts(node, prefix);
    return matchingContacts;
}

updateContactList();
