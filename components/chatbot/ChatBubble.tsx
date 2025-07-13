"use client";

import { useState } from 'react';
import { Bot, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatPanel } from './ChatPanel';

interface ChatBubbleProps {
  isPro: boolean;
}

export function ChatBubble({ isPro }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Si el usuario no es PRO, no mostramos la burbuja
  if (!isPro) return null;

  return (
    <>
      {/* Botón flotante que abre el chat */}      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 p-0 z-50 transition-all duration-300 hover:scale-105"
        aria-label="Abrir asistente de API"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>

      {/* Panel lateral del chat que se abre cuando isOpen es true */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-xl flex flex-col animate-in slide-in-from-right rounded-tl-lg rounded-bl-lg">
            <div className="flex items-center justify-between border-b px-4 py-3 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <h3 className="font-semibold">Asistente API</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar asistente"
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
            
            <ChatPanel />
          </div>
        </div>
      )}
    </>
  );
}
