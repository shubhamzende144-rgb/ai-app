const chatHistory = document.getElementById("chat-history");
const userInput = document.getElementById("user-input");

function handleEnter(event) {
  if (event.key === "Enter") {
    send();
  }
}

async function send() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  showTypingIndicator();

  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    removeTypingIndicator();
    addMessage(data.reply, "ai");
  } catch (err) {
    removeTypingIndicator();
    addMessage("Error connecting to AI backend", "ai");
    console.error(err);
  }
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  if (sender === "ai") {
    messageDiv.innerHTML = `
      <div class="avatar">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
        </svg>
      </div>
      <div class="bubble">${text}</div>
    `;
  } else {
    messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
  }

  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.id = "typing-indicator";
  typingDiv.classList.add("message", "ai");
  typingDiv.innerHTML = `
    <div class="avatar">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
      </svg>
    </div>
    <div class="bubble">
      <div class="typing-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  `;
  chatHistory.appendChild(typingDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}
