const API_URL = "https://vince3-backend.onrender.com/chat"; // Replace with actual Render backend URL

async function sendMessage() {
    const userMessage = document.getElementById("messageInput").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    document.getElementById("response").innerText = data.response;
}
