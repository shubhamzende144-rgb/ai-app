function send() {
  fetch("/.netlify/functions/chat", {
    method: "POST",
    body: JSON.stringify({ message: msg.value })
  })
    .then(r => r.json())
    .then(d => out.textContent = d.reply);
}
