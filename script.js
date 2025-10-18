const API_URL = "https://genai-chatbot-backend-gm4l.onrender.com/chat";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message, "user");
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    addMessage("Bot", data.response, "bot");
  } catch (error) {
    console.error("Error:", error);
    addMessage("Bot", "Sorry, something went wrong.", "bot");
  }
}

function addMessage(sender, text, cls) {
  const box = document.getElementById("chat-box");
  const msg = document.createElement("p");
  msg.className = cls;
  msg.textContent = `${sender}: ${text}`;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}
