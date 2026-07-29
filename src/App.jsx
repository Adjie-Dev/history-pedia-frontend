import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
      const response = await fetch(`${API_URL}/api/chat`, {
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
    // Jangan beri background opak di pembungkus ini: lapisan foto memakai -z-10,
    // jadi background di sini akan menutupinya. Warna dasar diatur di body.
    <div className="hp-viewport flex flex-col overflow-hidden">
      {/* Latar: interior perpustakaan bersejarah (CC0). Diburamkan tipis dan
          digelapkan bergradasi supaya foto terlihat tapi teks tetap tajam. */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center blur-[2px]"
          style={{ backgroundImage: 'url(/images/perpustakaan.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-espresso/30 to-espresso/75" />
        {/* Vignette: menenangkan tepi layar supaya kartu chat jadi pusat perhatian */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(75% 65% at 50% 45%, transparent, rgba(26,18,12,0.75))' }}
        />
      </div>

      {/* min-w-0 dan min-h-0 di sepanjang rantai flex: tanpa itu anak flex memakai
          min-width/min-height auto, sehingga tabel lebar memaksa kolom melebar
          melewati layar dan halaman ikut menggulir. */}
      <div className="mx-auto flex w-full min-h-0 min-w-0 max-w-3xl flex-1 flex-col overflow-hidden sm:px-6 sm:py-6">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-parchment/10 sm:rounded-3xl">
          <Header />

          <div
            className="hp-scroll hp-glass min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-4 sm:px-6 sm:py-6"
            aria-live="polite"
          >
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.text}
                isUser={msg.isUser}
              />
            ))}
            {loading && (
              <div className="mb-4 flex animate-fade-up flex-col items-start sm:mb-5">
                <span className="mb-1.5 px-1 text-xs font-medium text-parchment/70">
                  History Pedia
                </span>
                <div className="hp-glass-light flex items-center gap-3 rounded-2xl rounded-bl-md px-4 py-3 shadow-xl shadow-black/25 ring-1 ring-black/5 sm:px-5 sm:py-4">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brass"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brass" style={{ animationDelay: '0.15s' }}></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-brass" style={{ animationDelay: '0.3s' }}></span>
                  </span>
                  <span className="text-sm text-[#241A12]/70">Menyusun jawaban</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;