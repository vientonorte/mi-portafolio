import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white border-t border-gray-100 p-4 md:p-6 flex items-end gap-3 z-10"
    >
      <div className="relative flex-1 bg-gray-50 rounded-[20px] border border-gray-200 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-50 transition-all duration-200">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          disabled={disabled}
          className="w-full max-h-[120px] bg-transparent border-none focus:ring-0 resize-none py-3.5 px-5 text-gray-800 placeholder-gray-400 rounded-[20px] font-[400] text-[15px] leading-[24px] min-h-[52px]"
          rows={1}
          aria-label="Mensaje"
        />
      </div>
      {/* A11Y: Touch target is 52x52px, well above the 44px minimum */}
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className={`flex-shrink-0 h-[52px] w-[52px] rounded-full flex items-center justify-center transition-all duration-200
          ${input.trim() && !disabled 
            ? 'bg-brand-700 text-white hover:bg-brand-800 shadow-md hover:shadow-lg hover:-translate-y-0.5' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        aria-label="Enviar mensaje"
      >
        {disabled ? <Loader2 size={22} className="animate-spin" /> : <Send size={22} className="ml-1" strokeWidth={1.5} />}
      </button>
    </form>
  );
};
