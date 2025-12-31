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
        <div className="border-t border-stone-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl">
                <div className="relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tanyakan tentang sejarah..."
                        disabled={disabled}
                        className="w-full px-4 py-3 pr-14 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600 disabled:bg-stone-100 disabled:cursor-not-allowed text-stone-800"
                    />
                    <button
                        type="submit"
                        disabled={disabled || !message.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 rounded-full flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatInput;