import React, { useState } from 'react';

function ChatInput({ onSendMessage, disabled }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(message.trim() && !disabled) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="hp-glass border-t border-brass/20 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:px-5 sm:pb-4 sm:pt-4">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <label htmlFor="chat-input" className="sr-only">Pertanyaan sejarah</label>
                    <input
                        id="chat-input"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tanyakan tentang sejarah..."
                        disabled={disabled}
                        autoComplete="off"
                        enterKeyHint="send"
                        className="h-12 w-full rounded-full border border-parchment/20 bg-espresso/70 pl-5 pr-14 text-[15px] text-parchment outline-none transition-colors placeholder:text-parchment/45 focus:border-brass/70 focus:ring-2 focus:ring-brass/50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                    />
                    <button
                        type="submit"
                        disabled={disabled || !message.trim()}
                        aria-label="Kirim pertanyaan"
                        className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brass text-espresso transition after:absolute after:-inset-1.5 after:content-[''] hover:bg-brass/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-oak disabled:opacity-40"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatInput;
