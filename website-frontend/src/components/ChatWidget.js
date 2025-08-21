import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [proactive, setProactive] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: 'Hi! Need help choosing the right size?' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setProactive(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text }]);
    setInput('');
    // instant auto-response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'bot', text: 'Thanks! We will get right back to you.' }
      ]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Proactive nudge */}
      <AnimatePresence>
        {!open && proactive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 bg-white/95 text-dwapor-museum shadow-xl rounded-lg px-4 py-2 border border-dwapor-soft-gray/20"
          >
            <p className="text-xs">Need help choosing the right size?</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fab */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="w-12 h-12 rounded-full bg-dwapor-amber text-dwapor-museum shadow-lg flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l.8-4A8.994 8.994 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            className="absolute bottom-16 right-0 w-80 bg-white border border-dwapor-soft-gray/20 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-dwapor-soft-gray/20 bg-white/60 backdrop-blur-18">
              <p className="font-serif text-dwapor-museum">Chat with us</p>
            </div>
            <div className="h-64 overflow-y-auto px-3 py-2 space-y-2">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.from === 'user' ? 'bg-dwapor-amber text-dwapor-museum' : 'bg-dwapor-museum text-dwapor-amber'} max-w-[75%] px-3 py-2 rounded-lg`}>{m.text}</div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="p-3 border-t border-dwapor-soft-gray/20 bg-white/60 backdrop-blur-18">
              <div className="flex items-center space-x-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message"
                  className="flex-1 border border-dwapor-soft-gray/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                />
                <button onClick={sendMessage} className="px-3 py-2 bg-dwapor-amber text-dwapor-museum rounded-md text-sm">Send</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;

