"use client";

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '¡Hola! Soy el asistente de la API de Anime. ¿Cómo puedo ayudarte hoy?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Función para enviar mensajes al API de chatbot (que a su vez usará Gemini)
  const sendMessageToGemini = async (message: string) => {
    try {
      setIsLoading(true);
      
      // Llamada a nuestro endpoint de chatbot
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
        // Si hay errores en la API, mostramos un mensaje de error amigable
      if (!response.ok) {
        const fallbackResponse = {
          role: 'assistant' as const,
          content: 'Lo siento, parece que hay un problema con el asistente en este momento. Por favor, intenta de nuevo más tarde o consulta la documentación de la API.'
        };
        
        setMessages(prev => [...prev, fallbackResponse]);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant' as const,
        content: data.response || 'Entiendo tu pregunta. Para información más detallada, consulta la documentación de la API.'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al enviar mensaje a API de chatbot:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, he tenido un problema para procesar tu consulta. Por favor, intenta de nuevo.'
      }]);
      setIsLoading(false);
    }
  };
  // La lógica de respuestas ahora se gestiona completamente en el backend

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Añadir mensaje del usuario
    const userMessage = {
      role: 'user' as const,
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    sendMessageToGemini(inputValue);
    setInputValue('');
  };

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Área de mensajes */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                } shadow-sm`}
              >
                <p className="whitespace-pre-wrap break-words overflow-x-auto max-w-full" style={{wordBreak:'break-word', overflowWrap:'anywhere'}}>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>      {/* Formulario de entrada */}      <div className="p-4 pb-6 border-t dark:border-gray-800">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu pregunta sobre la API..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600 
                      dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-inner"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-lg"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>        <p className="text-xs text-gray-500 mt-2 text-center">
          Este asistente responde preguntas sobre el uso de la API, pero no tiene acceso directo a tus datos.
        </p>
      </div>
    </div>
  );
}
