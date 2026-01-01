import React from 'react';

function ChatMessage({ message, isUser }) {
    // Convert markdown bold to HTML
    const formatMessage = (text) => {
        // Bold: **text** -> <strong>text</strong>
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Line breaks
        formatted = formatted.replace(/\n/g, '<br />');

        return formatted;
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`${isUser
                ? 'bg-amber-700 text-white'
                : 'bg-stone-100 border-2 border-amber-200'
                } rounded-lg px-6 py-4 max-w-3xl`}>
                {isUser ? (
                    <p className="text-base leading-relaxed">{message}</p>
                ) : (
                    <div
                        className="text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
                    />
                )}
            </div>
        </div>
    );
}

export default ChatMessage;