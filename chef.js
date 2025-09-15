document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");

    async function sendMessage() {
        const message = inputField.value.trim();
        if (!message) return;

        // User message
        const userMessage = document.createElement("div");
        userMessage.className = "chat-message user";
        userMessage.textContent = message;
        chatBox.appendChild(userMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
        inputField.value = "";

        // Bot thinking
        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.textContent = "Thinking...";
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            botMessage.textContent = data.reply;
            chatBox.scrollTop = chatBox.scrollHeight;

        } catch (err) {
            botMessage.textContent = "⚠️ Could not connect to ChefBot.";
            console.error(err);
        }
    }

    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});
