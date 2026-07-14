export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
}

export interface SuggestedQuestion {
  label: string;
  text: string;
  icon: 'briefcase' | 'monitor-play' | 'message-circle' | 'shield-check';
}
