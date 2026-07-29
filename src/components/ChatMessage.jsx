import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Kelas prose untuk jawaban AI: heading, daftar, tabel, dan kode ikut tertata.
// Tabel dibungkus pembungkus yang bisa digulir sendiri supaya halaman tidak
// pernah ikut menggulir ke samping di layar sempit.
const markdownComponents = {
    table: ({ node, ...props }) => (
        <div className="my-3 max-w-full overflow-x-auto rounded-lg border border-black/10">
            {/* my-0: margin bawaan prose pada tabel akan tampak sebagai celah
                kosong di dalam pembungkus berbingkai ini */}
            <table className="my-0 w-full border-collapse text-left text-sm" {...props} />
        </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-black/[0.06]" {...props} />,
    // Model kadang menutup tabel dengan baris kosong; baris seperti itu dibuang
    // supaya tidak menyisakan garis dan ruang kosong di bawah tabel.
    tr: ({ node, ...props }) => {
        const isEmpty = (node?.children || [])
            .filter((cell) => cell.type === 'element')
            .every((cell) => !(cell.children || [])
                .some((child) => (child.value || '').trim() || child.type === 'element'));
        if(isEmpty) return null;
        return <tr className="[&:last-child>td]:border-b-0" {...props} />;
    },
    th: ({ node, ...props }) => (
        <th className="border-b border-black/10 px-3 py-2 align-top font-semibold" {...props} />
    ),
    td: ({ node, ...props }) => (
        <td className="border-b border-black/5 px-3 py-2 align-top" {...props} />
    ),
    a: ({ node, children, ...props }) => (
        <a className="font-medium underline underline-offset-2" target="_blank" rel="noreferrer" {...props}>
            {children}
        </a>
    ),
};

function ChatMessage({ message, isUser }) {
    return (
        <div className={`mb-4 flex animate-fade-up flex-col sm:mb-5 ${isUser ? 'items-end' : 'items-start'}`}>
            <span className="mb-1.5 px-1 text-xs font-medium text-parchment/70">
                {isUser ? 'Anda' : 'History Pedia'}
            </span>
            <div className={`${isUser
                ? 'hp-glass-rope rounded-2xl rounded-br-md text-parchment ring-1 ring-white/15'
                : 'hp-glass-light rounded-2xl rounded-bl-md text-[#241A12] ring-1 ring-black/5'
                } ${isUser ? 'max-w-[86%]' : 'max-w-[94%]'} break-words px-4 py-3 shadow-xl shadow-black/25 sm:max-w-[80%] sm:px-5 sm:py-4 md:max-w-2xl`}>
                {isUser ? (
                    <p className="text-[15px] leading-relaxed sm:text-base">{message}</p>
                ) : (
                    <div className="prose prose-sm max-w-none text-[15px] leading-relaxed text-[#241A12] prose-headings:font-semibold prose-headings:text-[#241A12] prose-h1:text-lg prose-h2:text-base prose-h3:text-[15px] prose-p:my-2 prose-a:text-[#5C3A17] prose-strong:text-[#241A12] prose-ol:my-2 prose-ul:my-2 prose-li:my-0.5 prose-hr:my-4 prose-hr:border-black/10 sm:text-base">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                            {message}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatMessage;
