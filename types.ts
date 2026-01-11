
export type Role = 'user' | 'assistant' | 'system';
export type MessageType = 'text' | 'lead-capture' | 'success';

export interface Source {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  type?: MessageType;
  sources?: Source[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
