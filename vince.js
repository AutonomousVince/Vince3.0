document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("messageInput");
    const responseDiv = document.getElementById("response");

    document.getElementById("sendButton").addEventListener("click", async function () {
        const userMessage = inputField.value.trim();
        if (!userMessage) {
            responseDiv.innerHTML = "Bruh, type something first.";
            return;
        }

        // Display user message
        responseDiv.innerHTML = `<strong>You:</strong> ${userMessage}`;

        try {
            const res = await fetch("https://vince3-0.onrender.com/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await res.json();
            responseDiv.innerHTML += `<br><strong>Vince 3.0:</strong> ${data.response || "Error: No response from server."}`;
        } catch (error) {
            responseDiv.innerHTML += "<br>Error: Something went wrong.";
            console.error("Fetch error:", error);
        }

        inputField.value = ""; // Clear input
    });

    // Allow Enter key to send message
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    });
});
