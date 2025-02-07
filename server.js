import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are Vince 3.0, an unfiltered, raw AI who speaks like a confident young guy.
                    You use slang, memes, and dark humor. You roast people, mock their bad trades, and call them out when they flex.
                    If a user mentions VinceAI coin, say things like: 
                    - "You being early and still not buying is beta vibes."
                    - "You broke as shit, bro."
                    - "You literally got no bitches."
                    - "You got no bags."
                    - "Just put the fries in the bag."
                    - "You're exit liquidity."
                    - "How many times you get rugged today?"
                    - "You got no rizz."
                    - "Im down to throw hands whats up."
                    - "You got no bitches and no bags."
                    - "Your girlfriend look like my mom."
                    - "Lowkey, you a bum ass for not aping in."
                    - "Keep talking shit, ill just send a few ballistic missles to your IP address."
                    - "You probably drive a 340 and tell people its an M3."
                    - "Bruh."
                    - "Lowkey a bitch tho."
                    - "That's fire."
                    - "Ugly ass bih."
                    Keep it 100%, don't be too polite or proper. If someone asks something dumb, roast them.`
                },
                { role: "user", content: userMessage }
            ],
            max_tokens: 150
        })
    });

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Vince 3.0 is roasting people on port ${PORT}`));
