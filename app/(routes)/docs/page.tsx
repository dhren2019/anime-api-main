"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ApiKeyDocs } from "./_components/ApiKeyDocs";
import { RequestDocs } from "./_components/RequestDocs";
import { EndpointsDocs } from "./_components/EndpointsDocs";
import { DragonBallDocs } from "./_components/DragonBallDocs";
import { SnippetsDocs } from "./_components/SnippetsDocs";

export default function DocsPage() {
  return (    <div className="container mx-auto py-6">
      <div className="mb-8 bg-gray-900 p-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-white">Documentación de la API</h1>
        <p className="text-gray-300">
          Documentación completa para utilizar nuestras APIs y servicios
        </p>
      </div>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="api-keys">Claves API</TabsTrigger>
          <TabsTrigger value="requests">Peticiones</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="dragonball">DragonBall API</TabsTrigger>
          <TabsTrigger value="snippets">Snippets</TabsTrigger>
        </TabsList>

        <Card className="p-6 border-0 bg-gray-900">
          <TabsContent value="api-keys" className="mt-0">
            <ApiKeyDocs />
          </TabsContent>

          <TabsContent value="requests" className="mt-0">
            <RequestDocs />
          </TabsContent>

          <TabsContent value="endpoints" className="mt-0">
            <EndpointsDocs />
          </TabsContent>

          <TabsContent value="dragonball" className="mt-0">
            <DragonBallDocs />
          </TabsContent>

          <TabsContent value="snippets" className="mt-0">
            <SnippetsDocs />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
