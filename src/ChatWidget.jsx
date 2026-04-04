import { useState, useRef, useEffect } from "react";

const sessionId = crypto.randomUUID();
const API_KEY = import.meta.env.VITE_API_KEY;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hola 👋 Soy el asistente de esta página.\n\nPuedes preguntarme sobre Diego, sobre esta página o sobre como funciono yo mismo. ¿En qué puedo ayudarte?." },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);

    // Respuesta simulada del bot
    ///setMessages((prev) => [
    ///  ...prev,
    ///  userMsg,
    ///  { role: "bot", text: "Esta es una respuesta simulada (sin backend todavía)." },
    ///]);

    setInput("");


    try {
        const res = await fetch("https://portfolio-backend-xyze.onrender.com/ask", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "x-api-key": API_KEY 
        },
        body: JSON.stringify({
          question: input,
          history: messages,
          session_id: sessionId
        }),
    });

        const data = await res.json();
        const botMsg = { role: "bot", text: data.answer };
        setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
        const botMsg = { role: "bot", text: "Error: no se pudo conectar al servidor." };
        setMessages((prev) => [...prev, botMsg]);
    }


    

  }

  return (
    <div className="chat-container">
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Chat CV</span>
            <button className="chat-close" onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role} whitespace-pre-wrap`}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe aquí..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}