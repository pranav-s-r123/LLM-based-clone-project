import { useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (userInput) => {
    const newMessages = [
      ...messages,
      { role: "user", content: userInput }
    ];
    setMessages(newMessages);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          messages: newMessages
        })
      });

      const data = await response.json();
      const reply = data.content[0].text;

      setMessages([...newMessages, 
        { role: "assistant", content: reply }
      ]);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
}