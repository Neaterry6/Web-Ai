document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.getElementById("loginForm");
  const chatForm = document.getElementById("chatForm");
  const chatWindow = document.getElementById("chatWindow");

  // Fetch user ID from localStorage (if already logged in)
  const userId = localStorage.getItem("userId");

  // **Handle Login Submission**
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Save the token and user ID in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);

          alert("Login successful!");
          window.location.href = "chat.html"; // Redirect to chat interface
        } else {
          alert(data.error || "Login failed!");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
      }
    });
  }

  // **Handle Chat History Fetching**
  const fetchHistory = async () => {
    if (!userId) {
      alert("Please log in first!");
      window.location.href = "login.html"; // Redirect to login if no user ID
      return;
    }

    try {
      const response = await fetch(`/chat/history?userId=${userId}`);
      const { history } = await response.json();

      history.forEach(({ message, reply }) => {
        const userBubble = document.createElement("div");
        userBubble.textContent = `You: ${message}`;
        chatWindow.appendChild(userBubble);

        const botBubble = document.createElement("div");
        botBubble.textContent = `Ayanfe: ${reply}`;
        chatWindow.appendChild(botBubble);
      });
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Call `fetchHistory` on page load in chat interface
  if (chatForm && chatWindow) {
    await fetchHistory();
  }

  // **Handle Chat Submission**
  if (chatForm) {
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userMessage = document.getElementById("chatInput").value;
      document.getElementById("chatInput").value = "";

      const userBubble = document.createElement("div");
      userBubble.textContent = `You: ${userMessage}`;
      chatWindow.appendChild(userBubble);

      try {
        const response = await fetch("/chat/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage, userId }),
        });

        const { reply } = await response.json();
        const botBubble = document.createElement("div");
        botBubble.textContent = `Ayanfe: ${reply}`;
        chatWindow.appendChild(botBubble);
      } catch (error) {
        const botBubble = document.createElement("div");
        botBubble.textContent = "Ayanfe: Sorry, something went wrong!";
        chatWindow.appendChild(botBubble);
      }
    });
  }
});
