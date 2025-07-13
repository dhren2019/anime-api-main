"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ApiKeyDialog } from "@/components/ui/api-key-dialog";
import { Card } from "@/components/ui/card";

export function ApiKeyDocs() {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Claves API</h2>
      <p className="text-gray-300 mb-6">
        Las claves API se utilizan para autenticar las peticiones a nuestra API. Debes incluir tu clave API en todas las peticiones para acceder 
        a los datos. Aquí puedes generar una nueva clave API o administrar las existentes.
      </p>

      <h3 className="text-xl font-semibold mb-3 text-white">Comenzando con las Claves API</h3>
      <div className="space-y-6">
        <Card className="p-6 bg-gray-800 border-0">
          <h4 className="text-lg font-medium mb-3 text-white">Generar una Nueva Clave API</h4>
          <p className="text-gray-300 mb-4">
            Para usar nuestra API, necesitas generar una clave API. Haz clic en el botón a continuación para crear una:
          </p>
          <Button onClick={() => setShowDialog(true)}>
            Generar Clave API
          </Button>

          <ApiKeyDialog open={showDialog} onOpenChange={setShowDialog} />
        </Card>

        <Card className="p-6 bg-gray-800 border-0">
          <h4 className="text-lg font-medium mb-3 text-white">Usando Tu Clave API</h4>
          <p className="text-gray-300 mb-4">
            Incluye tu clave API en la cabecera de todas las peticiones a nuestra API usando el siguiente formato:
          </p>
          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
            <code className="text-yellow-400">
              Authorization: Bearer TU_CLAVE_API
            </code>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800 border-0">
          <h4 className="text-lg font-medium mb-3 text-white">Seguridad de la Clave API</h4>
          <p className="text-gray-300 mb-4">
            Tu clave API concede acceso a nuestros datos y servicios. Nunca la compartas públicamente ni la incluyas en el control de versiones.
            Si tu clave se ve comprometida, genera una nueva inmediatamente y revoca la antigua.
          </p>
          <div className="flex items-center p-4 bg-yellow-900/50 border border-yellow-700 rounded-md mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm text-yellow-400">Nunca expongas tu clave API en código del lado del cliente o en repositorios públicos.</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
