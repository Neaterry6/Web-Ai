document.addEventListener("DOMContentLoaded", async () => {
  const chatForm = document.getElementById("chatForm");
  const chatWindow = document.getElementById("chatWindow");
  const userId = localStorage.getItem("userId") || "example_user_id"; // Replace with real user ID logic

  // Fetch chat history
  const fetchHistory = async () => {
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

  await fetchHistory(); // Call the function on page load

  // Handle chat form submission
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
});
