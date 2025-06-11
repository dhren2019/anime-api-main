'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Plus, Trash2, Eye } from 'lucide-react';

interface ApiKey {
  id: number;
  name: string;
  key: string;
  lastUsed: string;
  createdAt: string;
  plan?: string;
  requestsCount?: number;
  requestsLimit?: number;
}

export default function DashboardPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showKeyPopupId, setShowKeyPopupId] = useState<number | null>(null);
  const [viewedKeys, setViewedKeys] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await fetch('/api/keys');
        if (!response.ok) throw new Error('Failed to fetch API keys');
        const data = await response.json();
        setApiKeys(data.keys);
      } catch (error) {
        console.error('Error fetching API keys:', error);
        alert('Failed to load API keys. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('viewedApiKeys');
    if (stored) {
      try {
        setViewedKeys(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('viewedApiKeys', JSON.stringify(viewedKeys));
  }, [viewedKeys]);

  const handleCreateKey = async () => {
    const name = prompt('Enter a name for your API key:');
    if (!name) return;
    
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      if (!response.ok) throw new Error('Failed to create API key');
      
      const data = await response.json();
      setApiKeys([...apiKeys, data.key]);
    } catch (error) {
      console.error('Error creating API key:', error);
      alert('Failed to create API key. Please try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">API Keys</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them.
          </p>
        </div>
        <Button onClick={handleCreateKey} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Create new secret key
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 p-4 border-b font-medium text-xs sm:text-sm text-gray-500">
          <div>NAME</div>
          <div>KEY</div>
          <div className="hidden sm:block">CREATED</div>
          <div className="hidden sm:block">LAST USED</div>
          <div>ACTIONS</div>
        </div>

        {apiKeys.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No API keys created yet. Click the button above to create your first key.
          </div>
        ) : (
          apiKeys.map((key) => (
            <div key={key.id} className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 p-4 border-b items-center hover:bg-gray-50 text-xs sm:text-sm">
              <div className="font-medium break-words">{key.name}</div>
              <div className="font-mono text-sm max-w-[180px] truncate flex items-center gap-2 select-none">
                {key.key.slice(0, 8)}...{key.key.slice(-6)}
                {!viewedKeys[key.id] && (
                  <button
                    className="ml-1 p-1 hover:bg-gray-200 rounded"
                    title="Show API key"
                    onClick={() => {
                      if (!viewedKeys[key.id]) setShowKeyPopupId(key.id);
                    }}
                    disabled={!!viewedKeys[key.id]}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="hidden sm:block text-sm text-gray-500">
                {new Date(key.createdAt).toLocaleDateString()}
              </div>
              <div className="hidden sm:block text-sm text-gray-500">{key.lastUsed}</div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(key.key)}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return;
                    try {
                      const response = await fetch('/api/keys', {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: key.id }),
                      });
                      if (!response.ok) throw new Error('Failed to delete API key');
                      setApiKeys(apiKeys.filter((k) => k.id !== key.id));
                    } catch (error) {
                      console.error('Error deleting API key:', error);
                      alert('Failed to delete API key. Please try again.');
                    }
                  }}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
              {showKeyPopupId === key.id && !viewedKeys[key.id] && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                  <div className="bg-white p-6 rounded shadow-lg max-w-[90vw] w-[400px] relative">
                    <h2 className="font-bold mb-2 text-center">API Key</h2>
                    <textarea
                      className="w-full text-xs font-mono p-2 border rounded bg-gray-100 mb-2"
                      value={key.key}
                      readOnly
                      autoFocus
                      onClick={e => (e.target as HTMLTextAreaElement).select()}
                    />
                    <div className="text-xs text-red-600 text-center mb-2">Por seguridad, esta clave solo se mostrará una vez. ¡Cópiala y guárdala!</div>
                    <button
                      className="block mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => {
                        setShowKeyPopupId(null);
                        setViewedKeys(v => {
                          const updated = { ...v, [key.id]: true };
                          localStorage.setItem('viewedApiKeys', JSON.stringify(updated));
                          return updated;
                        });
                      }}
                    >Cerrar</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">API Documentation</h2>
        <p className="text-gray-600 mb-4 text-xs sm:text-base">
          To use the Anime API, include your API key in the headers of your requests:
        </p>
        <div className="bg-gray-900 text-white p-4 rounded font-mono text-xs sm:text-sm">
          curl https://api.animeplatform.com/v1/anime <br />
          &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
        </div>
      </div>
    </div>
  );
}
