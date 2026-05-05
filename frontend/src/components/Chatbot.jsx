import { useState, useEffect } from "react";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi 👋 I’m Peppy, your PaperNest assistant.\nHow can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // 🎯 Smart replies
  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("hi") || text.includes("hello")) {
      return "Hey there 👋 How can I assist you today?";
    }

    if (text.includes("book suggestion")) {
      return "📚 Try:\n• Atomic Habits\n• Deep Work\n• Rich Dad Poor Dad\n\nYou can search them in Books section!";
    }

    if (text.includes("book")) {
      return "📚 Go to Books → Search → Read / Save / Buy";
    }

    if (text.includes("research")) {
      return "📄 Explore latest research papers in the Research section.";
    }

    if (text.includes("news")) {
      return "📰 Check real-time news in Newspapers section.";
    }

    if (text.includes("save")) {
      return "❤️ Click 'Save' to store items. View them in Saved Library.";
    }

    if (text.includes("profile")) {
      return "👤 Profile shows your stats like reading hours & saved items.";
    }

    if (text.includes("not working") || text.includes("issue")) {
      return "⚠️ Facing issues?\n📧 papernest.support@gmail.com\n📞 +91 9876543210";
    }

    return "Sorry, please stick to PaperNest features only 😊";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // typing effect
    setTyping(true);

    setTimeout(() => {
      const botReply = {
        text: getBotReply(input),
        sender: "bot",
      };

      setMessages((prev) => [...prev, botReply]);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-yellow-400 text-black px-5 py-3 rounded-full shadow-xl z-50 hover:scale-110 transition"
      >
        💬
      </button>

      {/* 💬 Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[450px] bg-[#0f0f0f] text-white border border-white/10 rounded-2xl flex flex-col z-50 shadow-2xl">

          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="font-bold text-lg">Peppy 🤖</h2>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-sm whitespace-pre-line max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-yellow-400 text-black ml-auto"
                    : "bg-white/10"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className="text-gray-400 text-sm">
                Peppy is typing...
              </div>
            )}
          </div>

          {/* 💡 Quick Suggestions */}
          <div className="flex gap-2 px-3 pb-2 flex-wrap">
            <button
              onClick={() => setInput("book suggestion")}
              className="bg-white/10 px-3 py-1 rounded-full text-xs"
            >
              📚 Suggest Books
            </button>

            <button
              onClick={() => setInput("not working")}
              className="bg-white/10 px-3 py-1 rounded-full text-xs"
            >
              ⚠️ Report Issue
            </button>
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about PaperNest..."
              className="flex-1 p-2 rounded bg-white/10 outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-yellow-400 text-black px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;