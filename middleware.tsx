import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lista de rutas públicas que no requieren autenticación
const publicRoutes = [
  "/",
  "/api/test-key",
  "/api/v1/anime",
  "/api/v1/anime/(.*)",
  "/api/user",
  "/favicon.ico"
];

// Función para verificar si una ruta es pública
const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => {
    if (route.endsWith('(.*)')) {
      return path.startsWith(route.replace('(.*)', ''));
    }
    return path === route;
  });
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Si es una ruta pública, permitir acceso
  if (isPublicRoute(path)) {
    return NextResponse.next();
  }

  // Si es una ruta de la API, verificar API key
  if (path.startsWith('/api/v1/')) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return NextResponse.next();
    }
    return NextResponse.json({ error: 'API key required' }, { status: 401 });
  }

  // Para todas las demás rutas, permitir acceso por ahora
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.*\\..*).*)", // Excluir archivos con extensión
    "/(api|trpc)(.*)",  // Incluir rutas de API
  ],
};