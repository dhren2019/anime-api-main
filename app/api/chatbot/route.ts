import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/configs/db';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { eq, and } from 'drizzle-orm';
import { usersTable, apiKeysTable } from '@/configs/schema';
import { marked } from 'marked';
import removeMarkdown from './removeMarkdownUtil';

// Este endpoint procesa las consultas del chatbot y las envía a Gemini
export async function POST(req: Request) {
  try {    // Verificar autenticación
    const user = await currentUser();
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    // Buscar usuario en la base de datos
    const dbUserArr = await db.select().from(usersTable).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress)).limit(1);
    if (!dbUserArr.length) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    const dbUser = dbUserArr[0];
    // Buscar API key activa y plan
    const dbApiKeyArr = await db.select().from(apiKeysTable).where(and(eq(apiKeysTable.userId, dbUser.id), eq(apiKeysTable.isActive, true))).limit(1);
    if (!dbApiKeyArr.length || dbApiKeyArr[0].plan !== 'pro') {
      return NextResponse.json({ error: 'Esta función requiere un plan PRO' }, { status: 403 });
    }

    // Obtener el mensaje del usuario
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Se requiere un mensaje' }, { status: 400 });
    }
    // Configurar e inicializar la API de Google Generative AI (Gemini)
    // Asegúrate de tener la API key de Gemini en variables de entorno (.env.local)
    // GEMINI_API_KEY=tu-api-key-aquí
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY no está configurada en las variables de entorno');
      return NextResponse.json({ 
        response: "Lo siento, el asistente no está configurado correctamente. Por favor, contacta con el administrador." 
      });
    }
    
    // Inicializar el cliente de Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      // Instrucciones específicas para el contexto de la API
    const systemPrompt = 
    `Eres un asistente especializado de la API de Anime y DragonBall llamado "AnimeAPI Assistant" que ayuda a desarrolladores.
    
    INFORMACIÓN SOBRE LA API:
    - La API ofrece datos sobre anime y específicamente sobre DragonBall.
    - Endpoints principales:
      * GET /api/v1/anime - Búsqueda general de animes
      * GET /api/v1/anime/{id} - Detalles de un anime específico
      * GET /api/v1/dragonball/characters - Lista de personajes de DragonBall
      * GET /api/v1/dragonball/characters/{id} - Detalles de un personaje específico
      * GET /api/v1/dragonball/planets - Lista de planetas de DragonBall
      * GET /api/v1/dragonball/transformations - Lista de transformaciones
    - Planes y límites:
      * Plan Gratuito: 10 peticiones mensuales, acceso limitado a endpoints básicos
      * Plan PRO: 150 peticiones mensuales, acceso completo a todos los endpoints
    - Autenticación: Todas las consultas requieren una API key en el header "Authorization: Bearer API_KEY"
    - Formatos de respuesta: JSON estándar con estructura consistente
    
    PARÁMETROS COMUNES:
    - limit: Número de resultados a devolver (ej. ?limit=10)
    - page: Página de resultados para paginación (ej. ?page=2)
    - sort: Campo y dirección para ordenar (ej. ?sort=name:asc)
    - filter: Filtrar por campos específicos (ej. ?filter=race:saiyan)
    
    EJEMPLOS DE INTEGRACIÓN:
    
    JavaScript (fetch):
    
    fetch('https://tudominio.com/api/v1/anime', {
      headers: {
        'Authorization': 'Bearer TU_API_KEY'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data));
    
    Python (requests):
    
    import requests
    
    headers = {
        'Authorization': 'Bearer TU_API_KEY'
    }
    
    response = requests.get('https://tudominio.com/api/v1/dragonball/characters', headers=headers)
    data = response.json()
    
    INSTRUCCIONES IMPORTANTES:
    1. NUNCA proporciones datos directos de la API o resultados de consultas. Tu trabajo es ayudar a entender CÓMO usar la API, no dar sus datos.
    2. Orienta a los usuarios sobre cómo obtener la información usando la API por sí mismos.
    3. Da ejemplos de código cuando sea apropiado para diferentes lenguajes (JS, Python, PHP, etc.)
    4. Explica códigos de error comunes y cómo solucionarlos:
       * 401: API key inválida o no proporcionada
       * 403: Sin permiso para ese recurso (plan insuficiente)
       * 429: Límite de peticiones excedido
       * 404: Recurso no encontrado
    5. Sé conciso pero informativo.
    6. Si no sabes la respuesta, recomienda revisar la documentación oficial.
    
    Responde en el mismo idioma que te habla el usuario (español o inglés).`;
    
    try {
      // Configurar y enviar la solicitud a Gemini
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.2, // Bajo para respuestas más consistentes y factuales
          topP: 0.8,
        },
      });
        // Enviar el mensaje con las instrucciones del sistema primero
      console.log('Enviando mensaje a Gemini:', `${message.substring(0, 50)}...`);
      
      const result = await chat.sendMessage(`${systemPrompt}\n\nPregunta del usuario: ${message}`);
      const response = result.response.text();
      const plainTextResponse = removeMarkdown(response);
      console.log('Respuesta de Gemini recibida:', plainTextResponse.substring(0, 50) + '...');
      return NextResponse.json({ response: plainTextResponse });
    } catch (aiError) {
      console.error('Error al comunicarse con Gemini API:', aiError);
      
      // Comprobar si es un error de API key
      if (aiError instanceof Error && aiError.message.includes('API key')) {
        console.error('Error de API key de Gemini:', aiError.message);
        return NextResponse.json({ 
          response: "El servicio de asistente está configurado incorrectamente (error de API key). Por favor, notifica al administrador." 
        });
      } 
      
      // Comprobar si es un error de límite de cuota
      if (aiError instanceof Error && aiError.message.includes('quota') || aiError instanceof Error && aiError.message.includes('rate limit')) {
        console.error('Error de cuota excedida en Gemini:', aiError.message);
        return NextResponse.json({ 
          response: "El servicio de asistente ha alcanzado su límite de uso. Por favor, intenta más tarde." 
        });
      }
      
      // Respuesta de respaldo en caso de error con la API de Gemini
      return NextResponse.json({ 
        response: "Lo siento, parece que hay un problema con el asistente en este momento. Por favor, intenta de nuevo más tarde o consulta la documentación de la API." 
      });
    }
  } catch (error) {
    console.error('Error en el endpoint del chatbot:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
