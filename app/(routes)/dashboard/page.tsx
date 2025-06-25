'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Plus, Trash2, Eye } from 'lucide-react';
import { ApiKeyDialog } from '@/components/ui/api-key-dialog';

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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

  const handleCreateKey = async (name: string) => {
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error('Failed to create API key');
      
      const newKey = await response.json();
      setApiKeys(prev => [...prev, newKey.key]);
      setIsCreateDialogOpen(false);

    } catch (error) {
      console.error('Error creating API key:', error);
      alert('Failed to create API key. Please try again.');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta API key?')) return;
    
    try {
      const response = await fetch(`/api/keys/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete API key');
      setApiKeys(prev => prev.filter(key => key.id !== id));
    } catch (error) {
      console.error('Error deleting API key:', error);
      alert('Failed to delete API key. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">API Keys</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create new secret key
        </Button>
      </div>      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full"><thead>
              <tr className="text-left bg-gray-900 text-white">
                <th className="px-6 py-3 text-sm font-semibold rounded-tl-lg">NAME</th>
                <th className="px-6 py-3 text-sm font-semibold">KEY</th>
                <th className="px-6 py-3 text-sm font-semibold">CREATED</th>
                <th className="px-6 py-3 text-sm font-semibold">LAST USED</th>
                <th className="px-6 py-3 text-sm font-semibold rounded-tr-lg">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-6 py-4">{key.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                        {viewedKeys[key.id] ? key.key : `${key.key.substring(0, 8)}...${key.key.substring(key.key.length - 4)}`}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setViewedKeys(prev => ({ ...prev, [key.id]: !prev[key.id] }));
                          localStorage.setItem('viewedApiKeys', JSON.stringify({
                            ...viewedKeys,
                            [key.id]: !viewedKeys[key.id]
                          }));
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(key.key)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(key.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>      <ApiKeyDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onConfirm={handleCreateKey}
      />

      <div className="mt-12 space-y-4 p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold">API Documentation</h2>
        <p className="text-gray-600">
          To use the Anime API, include your API key in the headers of your requests:
        </p>
        <div className="bg-gray-900 text-white p-4 rounded font-mono text-sm">
          curl https://api.animeplatform.com/v1/anime \<br />
          &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
        </div>
      </div>
    </div>
  );
}
