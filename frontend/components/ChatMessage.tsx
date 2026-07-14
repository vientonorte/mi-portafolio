import React from 'react';
import { User, Sparkles } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import { Message } from '../types.ts';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar - Exactly 44px for visual rhythm and A11Y */}
        <div className={`flex-shrink-0 h-[44px] w-[44px] rounded-full flex items-center justify-center border
          ${isBot 
            ? 'bg-brand-50 text-brand-700 border-brand-100' 
            : 'bg-gray-100 text-gray-500 border-gray-200'}`}
        >
          {isBot ? <Sparkles size={20} strokeWidth={1.5} /> : <User size={20} strokeWidth={1.5} />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
          <div className={`px-5 py-4 rounded-[20px] shadow-soft text-[15px] leading-[24px] font-[400]
            ${isBot 
              ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm' 
              : 'bg-brand-700 text-white rounded-tr-sm' // brand-700 ensures >= 4.5:1 contrast
            }`}
          >
            {isBot ? (
              <div className="prose prose-sm md:prose-base max-w-none
                prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0
                prose-a:text-brand-700 prose-a:font-[500] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-[700] 
                prose-ul:my-2 prose-li:my-0.5"
              >
                <Markdown>{message.text}</Markdown>
              </div>
            ) : (
              <p className="whitespace-pre-wrap m-0">{message.text}</p>
            )}
          </div>
          <span className="text-[11px] text-gray-400 mt-1.5 px-1 font-[400] tracking-wide">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
