document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const chatForm = document.getElementById("chatForm");

  // Handle login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = "chat.html"; // Redirect to chat
      } else {
        alert("Invalid login credentials!");
      }
    });
  }

  // Handle chat
  if (chatForm) {
    const chatInput = document.getElementById("chatInput");
    const chatWindow = document.getElementById("chatWindow");

    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userMessage = chatInput.value;
      chatInput.value = "";

      // Display user message
      const userBubble = document.createElement("div");
      userBubble.textContent = `You: ${userMessage}`;
      chatWindow.appendChild(userBubble);

      // Fetch bot response
      const response = await fetch("/chat/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const { reply } = await response.json();

      // Display bot response
      const botBubble = document.createElement("div");
      botBubble.textContent = `Ayanfe: ${reply}`;
      chatWindow.appendChild(botBubble);
    });
  }
});
