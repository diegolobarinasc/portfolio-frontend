import { useState, useRef, useEffect } from "react";

const sessionId = crypto.randomUUID();
const API_URL = import.meta.env.VITE_API_URL; // URL del backend
const API_KEY = import.meta.env.VITE_API_KEY; // Token para el backend



export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hola 👋 Soy el asistente de esta página.\n\nPuedes preguntarme sobre Diego, sobre esta página o sobre como funciono yo mismo.\n\nTen en cuenta que la primera respuesta puede tardar unos segundos en llegar.\n\n¿En qué puedo ayudarte?." },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");


    // Mensaje de carga
    setMessages((prev) => [...prev, { role: "bot", text: null, loading: true }]);

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 70000); // 70 segundos

        const res = await fetch(`${API_URL}/ask`, {
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
        signal: controller.signal
    });

        clearTimeout(timeout);

        const data = await res.json();

        const botMsg = { role: "bot", text: data.answer };

        // Sustituye el "..." por la respuesta real
        setMessages((prev) => [...prev.slice(0, -1), botMsg]);

    } catch (err) {
      const botMsg = err.name === "AbortError"
        ? "El servidor está tardando en responder. Inténtalo de nuevo en unos segundos."
        : "Error: no se pudo conectar al servidor.";
      setMessages((prev) => [...prev.slice(0, -1), botMsg]);
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
                {m.loading ? <span className="loading-dots" /> : m.text}
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