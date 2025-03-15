'use client';

import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);


  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      sender: 'user',
      text: input,
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Failed to get chatbot response');
      }

      const { message: botResponse } = await response.json();
      const botMessage: Message = {
        sender: 'bot',
        text: botResponse,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., display an error message to the user)
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">AI Chatbot</h1>
        <div className="flex flex-col h-[500px] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-black self-start'
              }`}
            >
              {message.text}
            </div>
          ))}
            {loading && <div className="mb-2 p-2 rounded-lg bg-gray-200 text-black self-start">Thinking...</div>}
        </div>
        <div className="flex mt-4 space-x-4">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}