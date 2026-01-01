import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([
    {
      text: 'Selamat datang di History Pedia! Saya siap menjawab pertanyaan Anda tentang sejarah. Silakan tanyakan apa saja!',
      isUser: false
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('https://adjiee.pythonanywhere.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if(response.ok) {
        const aiMessage = { text: data.response, isUser: false };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage = {
          text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
          isUser: false
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch(error) {
      const errorMessage = {
        text: 'Maaf, tidak dapat terhubung ke server. Pastikan backend sudah berjalan.',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <Header />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto max-w-4xl">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-stone-100 rounded-lg px-6 py-4 border-2 border-amber-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-amber-700 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
}

export default App;