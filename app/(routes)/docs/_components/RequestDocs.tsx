"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RequestDocs() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Realizando Peticiones</h2>
      <p className="text-gray-300 mb-6">
        Aprende cómo realizar peticiones a nuestros endpoints utilizando diferentes lenguajes de programación y bibliotecas.
      </p>

      <h3 className="text-xl font-semibold mb-3 text-white">Ejemplos de Peticiones</h3>
      <Tabs defaultValue="curl" className="w-full">        <TabsList className="grid grid-cols-5 w-[400px] mb-4">
          <TabsTrigger value="curl">cURL</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="java">Java</TabsTrigger>
          <TabsTrigger value="go">Go</TabsTrigger>
        </TabsList>

        <Card className="p-4 bg-gray-800 border-0">
          <TabsContent value="curl" className="mt-0">
            <div className="space-y-4">
              <p className="text-gray-300">Usando cURL para hacer una petición a nuestra API:</p>
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-yellow-400">
{`curl -X GET https://api.example.com/v1/dragonball/characters \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="javascript" className="mt-0">
            <div className="space-y-4">
              <p className="text-gray-300">Usando JavaScript (fetch) para hacer una petición:</p>
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-yellow-400">
{`const fetchData = async () => {
  const response = await fetch('https://api.example.com/v1/dragonball/characters', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log(data);
};

fetchData();`}
                </pre>
              </div>
              
              <p className="text-gray-300 mt-6">Usando Axios:</p>
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-yellow-400">
{`import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/v1/dragonball/characters', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="python" className="mt-0">
            <div className="space-y-4">
              <p className="text-gray-300">Usando Python (requests) para hacer una petición:</p>
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-yellow-400">
{`import requests

url = "https://api.example.com/v1/dragonball/characters"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()

print(data)`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="java" className="mt-0">
            <div className="space-y-4">
              <p className="text-gray-300">Usando Java para hacer una petición:</p>
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-yellow-400">
{`import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class ApiRequest {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/v1/dragonball/characters"))
            .header("Authorization", "Bearer YOUR_API_KEY")
            .header("Content-Type", "application/json")
            .GET()
            .build();
            
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .thenAccept(System.out::println)
            .join();
    }
}`}
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="go" className="mt-0">
            <div className="space-y-4">
              <p className="text-gray-300">Usando Go para hacer una petición:</p>
              <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <pre className="text-yellow-400">
{`package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    url := "https://api.example.com/v1/dragonball/characters"
    
    req, _ := http.NewRequest("GET", url, nil)
    req.Header.Add("Authorization", "Bearer YOUR_API_KEY")
    req.Header.Add("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error making request:", err)
        return
    }
    defer resp.Body.Close()
    
    body, _ := ioutil.ReadAll(resp.Body)
    fmt.Println(string(body))
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Card>
      </Tabs>      <div className="mt-8 space-y-6">
        <Card className="p-6 bg-gray-800 border-0">
          <h4 className="text-lg font-medium mb-3 text-white">Límites de Tasa</h4>
          <p className="text-gray-300 mb-2">
            Para garantizar la estabilidad del servicio, aplicamos límites de tasa a las peticiones a la API:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Nivel gratuito: 60 peticiones por minuto</li>
            <li>Nivel Pro: 300 peticiones por minuto</li>
            <li>Nivel Empresarial: Límites personalizados</li>
          </ul>
        </Card>

        <Card className="p-6 bg-gray-800 border-0">
          <h4 className="text-lg font-medium mb-3 text-white">Formato de Respuesta</h4>
          <p className="text-gray-300 mb-4">
            Todas las respuestas de la API se devuelven en formato JSON con la siguiente estructura:
          </p>
          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
            <pre className="text-yellow-400">
{`{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}`}
            </pre>
          </div>
        </Card>

        <Card className="p-6 bg-gray-800 border-0">
          <h4 className="text-lg font-medium mb-3 text-white">Manejo de Errores</h4>
          <p className="text-gray-300 mb-4">
            En caso de error, la respuesta incluirá un mensaje de error y el código de estado HTTP apropiado:
          </p>
          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
            <pre className="text-yellow-400">
{`{
  "success": false,
  "error": {
    "code": "invalid_api_key",
    "message": "La clave API proporcionada no es válida o ha expirado"
  }
}`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
}
