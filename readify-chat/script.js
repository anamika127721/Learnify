// Mock contacts list (Replace with actual synced contacts later)
let contacts = [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
    { id: "user3", name: "Emily Johnson" }
];

let activeChat = null; // Stores the current chat ID

// Load contacts on page load
window.onload = function () {
    loadContacts();
};

// Function to load contacts in the sidebar
function loadContacts() {
    let contactsList = document.getElementById("contacts-list");
    contactsList.innerHTML = ""; // Clear existing contacts

    contacts.forEach(contact => {
        let li = document.createElement("li");
        li.textContent = contact.name;
        li.onclick = () => openChat(contact.id, contact.name);
        contactsList.appendChild(li);
    });
}

// Function to open a chat with a contact
function openChat(contactId, contactName) {
    activeChat = contactId; // Set active chat ID
    document.getElementById("chat-user").textContent = contactName;

    // Enable chat input
    document.getElementById("message").disabled = false;
    document.querySelector(".chat-input button").disabled = false;

    loadMessages(); // Load messages for this contact
}

// Function to send a message
function sendMessage() {
    let messageInput = document.getElementById("message");
    let messageText = messageInput.value.trim();

    if (messageText === "" || !activeChat) return;

    let chatBox = document.getElementById("chat-box");

    // Create message div
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "sent");
    messageDiv.textContent = messageText;

    chatBox.appendChild(messageDiv);
    messageInput.value = "";

    saveMessage(activeChat, messageText, "sent");

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to save messages per contact in local storage
function saveMessage(contactId, messageText, type) {
    let messages = JSON.parse(localStorage.getItem(contactId)) || [];
    messages.push({ text: messageText, type: type });
    localStorage.setItem(contactId, JSON.stringify(messages));
}

// Function to load messages for a selected contact
function loadMessages() {
    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; // Clear previous chat

    let messages = JSON.parse(localStorage.getItem(activeChat)) || [];

    messages.forEach(msg => {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("message", msg.type);
        messageDiv.textContent = msg.text;
        chatBox.appendChild(messageDiv);
    });

    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to latest message
}