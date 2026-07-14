import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, Phone, RefreshCw, Sparkles, Wind, Briefcase, MonitorPlay, MessageCircle, ShieldCheck } from 'lucide-react';
import { Message, ChatState } from './types.ts';
import { INITIAL_MESSAGE, SUGGESTED_QUESTIONS } from './constants.ts';
import { geminiService } from './services/geminiService.ts';
import { ChatMessage } from './components/ChatMessage.tsx';
import { ChatInput } from './components/ChatInput.tsx';

const generateId = () => Math.random().toString(36).substring(2, 9);

const App: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
    error: null,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatState(prev => ({
      ...prev,
      messages: [{
        id: generateId(),
        text: INITIAL_MESSAGE,
        sender: 'bot',
        timestamp: new Date()
      }]
    }));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleSendMessage = useCallback(async (text: string) => {
    const newUserMsg: Message = {
      id: generateId(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newUserMsg],
      isTyping: true,
      error: null,
    }));

    try {
      const responseText = await geminiService.sendMessage(text);
      
      const newBotMsg: Message = {
        id: generateId(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, newBotMsg],
        isTyping: false,
      }));
    } catch (error: any) {
      setChatState(prev => ({
        ...prev,
        isTyping: false,
        error: error.message || "Ocurrió un error inesperado.",
      }));
    }
  }, []);

  const handleReset = () => {
    geminiService.resetChat();
    setChatState({
      messages: [{
        id: generateId(),
        text: INITIAL_MESSAGE,
        sender: 'bot',
        timestamp: new Date()
      }],
      isTyping: false,
      error: null,
    });
  };

  const renderQuickActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase size={20} strokeWidth={1.5} />;
      case 'monitor-play': return <MonitorPlay size={20} strokeWidth={1.5} />;
      case 'message-circle': return <MessageCircle size={20} strokeWidth={1.5} />;
      case 'shield-check': return <ShieldCheck size={20} strokeWidth={1.5} />;
      default: return <Sparkles size={20} strokeWidth={1.5} />;
    }
  };

  return (
    <div className="h-full w-full flex justify-center bg-gray-50">
      {/* Grid Container: 1440px max, 64px margins on desktop, 24px gutters */}
      <div className="w-full max-w-[1440px] h-full md:px-margin-x md:py-8 grid grid-cols-12 gap-gutter">
        
        {/* Chat Window: Spans 8 cols centered on desktop, 12 cols on mobile */}
        <div className="col-span-12 lg:col-span-8 lg:col-start-3 flex flex-col h-full bg-white shadow-float md:rounded-[24px] overflow-hidden border border-gray-100">
          
          {/* Header - Clean, minimalist design with distinct Logo */}
          <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              {/* Viento Norte Logo Placeholder */}
              <div className="bg-brand-900 text-brand-50 w-[44px] h-[44px] flex items-center justify-center rounded-xl shadow-sm">
                <Wind size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-[700] text-gray-900 text-lg leading-tight tracking-tight">Viento Norte</h1>
                <p className="text-gray-500 text-sm font-[400]">Asistente de Consultoría</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* A11Y: Touch targets exactly 44px */}
              <a href="mailto:contacto@vientonorte.cl" className="w-[44px] h-[44px] flex items-center justify-center text-gray-400 hover:text-brand-700 hover:bg-brand-50 rounded-full transition-colors" title="Enviar correo" aria-label="Enviar correo">
                <Mail size={20} strokeWidth={1.5} />
              </a>
              <a href="https://wa.me/56942637408" target="_blank" rel="noopener noreferrer" className="w-[44px] h-[44px] flex items-center justify-center text-gray-400 hover:text-brand-700 hover:bg-brand-50 rounded-full transition-colors" title="WhatsApp" aria-label="Contactar por WhatsApp">
                <Phone size={20} strokeWidth={1.5} />
              </a>
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <button onClick={handleReset} className="w-[44px] h-[44px] flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" title="Reiniciar chat" aria-label="Reiniciar chat">
                <RefreshCw size={20} strokeWidth={1.5} />
              </button>
            </div>
          </header>

          {/* Chat Area */}
          <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-gray-50/50">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
              
              {chatState.messages.map((msg, index) => (
                <div key={msg.id} className="flex flex-col gap-3">
                  <ChatMessage message={msg} />
                  
                  {/* Quick Actions / Suggestions - Rendered as rich cards */}
                  {index === 0 && chatState.messages.length === 1 && !chatState.isTyping && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:ml-[56px] mt-2">
                      {SUGGESTED_QUESTIONS.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(action.text)}
                          className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-[16px] hover:border-brand-300 hover:bg-brand-50 hover:shadow-md transition-all text-left group focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                          aria-label={`Acción rápida: ${action.label}`}
                        >
                          <div className="flex-shrink-0 text-brand-600 bg-brand-50 p-2.5 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-colors">
                            {renderQuickActionIcon(action.icon)}
                          </div>
                          <div className="flex flex-col justify-center h-full">
                            <span className="text-[15px] font-[700] text-gray-900 group-hover:text-brand-800 transition-colors leading-tight mb-0.5">
                              {action.label}
                            </span>
                            <span className="text-[13px] font-[400] text-gray-500 line-clamp-2 leading-snug">
                              {action.text}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {chatState.isTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex max-w-[85%] flex-row items-end gap-3">
                    <div className="flex-shrink-0 h-[44px] w-[44px] rounded-full bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100">
                      <Sparkles size={20} strokeWidth={1.5} className="animate-pulse" />
                    </div>
                    <div className="bg-white border border-gray-100 px-5 py-4 rounded-[20px] rounded-bl-none shadow-soft flex items-center gap-1.5 h-[44px]">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {chatState.error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-[16px] text-sm text-center border border-red-100 font-[500]">
                  {chatState.error}
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </main>

          {/* Input Area */}
          <ChatInput onSendMessage={handleSendMessage} disabled={chatState.isTyping} />
        </div>
      </div>
    </div>
  );
};

export default App;
