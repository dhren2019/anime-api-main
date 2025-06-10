# Anime API Platform

Una plataforma SaaS que proporciona una API RESTful para acceder a una extensa base de datos de anime, utilizando los datos del [Anime Offline Database](https://github.com/manami-project/anime-offline-database).

## Características

- 🔐 Autenticación de usuarios con Clerk
- 🔑 Generación y gestión de API keys
- 📚 Base de datos con más de 38,000 animes
- 🔍 Búsqueda y filtrado avanzado
- 📄 Paginación de resultados
- 🚀 API RESTful

## Requisitos

- Node.js 18 o superior
- PostgreSQL (se recomienda usar Neon.tech)
- npm o yarn

## Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd anime-api-rest
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar las variables de entorno:
Crear un archivo `.env` con las siguientes variables:
```env
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=your_database_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Comandos de Drizzle:
```bash
# Generar migraciones
npx drizzle-kit generate

# Aplicar migraciones
npx drizzle-kit push

# Iniciar Drizzle Studio (interfaz visual de la base de datos)
npx drizzle-kit studio
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura de la Base de Datos

### Tablas

- `users`: Información de usuarios
- `api_keys`: API keys generadas por los usuarios
- `animes`: Datos de anime

## API Endpoints

### Autenticación

Todas las peticiones a la API deben incluir el header de autorización:
```
Authorization: Bearer YOUR_API_KEY
```

### Endpoints

#### Listar Animes
```
GET /api/v1/anime
```

Parámetros de consulta:
- `page`: Número de página (default: 1)
- `limit`: Resultados por página (default: 10)
- `search`: Búsqueda por título
- `type`: Filtrar por tipo de anime

Ejemplo de respuesta:
```json
{
    "data": [
        {
            "id": 1,
            "title": "Nombre del Anime",
            "type": "TV",
            "episodes": 12,
            "status": "FINISHED",
            "animeSeason": {"year": 2023, "season": "SPRING"},
            "picture": "https://...",
            "thumbnail": "https://...",
            "sources": ["https://..."],
            "synonyms": ["Otro nombre", "..."],
            "relations": ["https://..."],
            "tags": ["action", "adventure"]
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 38702,
        "pages": 3871
    }
}
```

#### Obtener un Anime
```
GET /api/v1/anime/{id}
```

### Gestión de API Keys

#### Crear API Key
```
POST /api/keys
Content-Type: application/json

{
    "name": "Nombre de la API Key"
}
```

#### Listar API Keys
```
GET /api/keys
```

#### Eliminar API Key
```
DELETE /api/keys
Content-Type: application/json

{
    "id": "ID_de_la_API_Key"
}
```

## Desarrollo

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npx drizzle-kit generate:pg`: Genera las migraciones de Drizzle
- `npx drizzle-kit push:pg`: Aplica las migraciones a la base de datos
- `npm run import-anime`: Importa los datos de anime

### Base de Datos

Para actualizar el esquema de la base de datos:

1. Modificar el archivo `configs/schema.ts`
2. Generar las migraciones:
```bash
npx drizzle-kit generate:pg
```
3. Aplicar las migraciones:
```bash
npx drizzle-kit push:pg
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Funcionalidades principales
- Autenticación con Clerk (sign-in/sign-up)
- Generación y gestión de API keys personales
- Búsqueda de animes en la base de datos usando API key
- Panel de usuario y ajustes de cuenta

## Uso de la API Key
1. Inicia sesión y genera una API key desde el dashboard.
2. Usa tu API key para acceder a los endpoints protegidos.

### Endpoint de búsqueda de anime

**GET** `/api/v1/anime?query=naruto`

**Headers:**
```
Authorization: Bearer TU_API_KEY
```

**Respuesta:**
```json
{
  "animes": [
    {
      "id": 1,
      "title": "Naruto",
      "type": "TV",
      "episodes": 220,
      "status": "Finished",
      "animeSeason": "Spring 2002",
      "picture": "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      "thumbnail": "https://cdn.myanimelist.net/images/anime/13/17405t.jpg"
    },
    ...
  ]
}
```

Puedes buscar por cualquier título parcial o completo usando el parámetro `query`.

### Ejemplo de uso en Postman
1. Selecciona método **GET**
2. URL: `http://localhost:3000/api/v1/anime?query=naruto`
3. En la pestaña Headers, añade:
   - Key: `Authorization`
   - Value: `Bearer TU_API_KEY`
4. Haz la solicitud y verás los resultados en formato JSON.

---

## Página de búsqueda de anime (`/search`)
- Accesible desde el sidebar debajo de "Generate API Key".
- El usuario debe ingresar su API key para acceder.
- Permite buscar animes por título y muestra los resultados con imagen, título y tipo/estado.

---

## Ajustes de cuenta
- En la página `/settings` puedes gestionar tu cuenta Clerk (email, contraseña, etc.)

---

## Notas
- Las API keys solo se muestran completas una vez por seguridad.
- Si tienes problemas con la autenticación o la API key, revisa la configuración del middleware y las rutas públicas/privadas.
