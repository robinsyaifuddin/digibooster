
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatBotState {
  messages: ChatMessage[];
  isTyping: boolean;
  conversationState: 'initial' | 'ongoing' | 'ending';
}

export interface QuickReply {
  text: string;
  action?: () => void;
}
