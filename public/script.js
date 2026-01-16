const chatHistory = document.getElementById("chat-history");
const userInput = document.getElementById("user-input");

async function send() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  addMessage("Thinking...", "ai");

  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    // remove "Thinking..."
    chatHistory.lastChild.remove();

    if (data.reply) {
      addMessage(data.reply, "ai");
    } else {
      addMessage("No reply from backend", "ai");
    }

  } catch (err) {
    chatHistory.lastChild.remove();
    addMessage("Error connecting to AI backend", "ai");
    console.error(err);
  }
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML = `<div class="bubble">${text}</div>`;
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
