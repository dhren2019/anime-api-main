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

## Configuración de Stripe Webhooks
Para que la aplicación reciba notificaciones de eventos de Stripe (como la finalización de una compra), se utiliza un webhook.

1.  **Endpoint del Webhook:** El endpoint en tu aplicación es `/api/stripe/webhook`.
2.  **Manejo de Eventos:** Cuando una sesión de checkout de Stripe se completa (`checkout.session.completed`), este webhook se encarga de:
    -   Buscar al usuario en la base de datos.
    -   Si el usuario ya tiene una API Key, su plan se actualiza a 'pro' con un límite de 150 solicitudes.
    -   Si el usuario no tiene una API Key, se le genera una nueva clave API automáticamente con el plan 'pro' y un límite de 150 solicitudes.
3.  **Para probar webhooks localmente (Stripe CLI):**
    -   Asegúrate de tener la [Stripe CLI](https://stripe.com/docs/stripe-cli) instalada y configurada.
    -   **Autenticar Stripe CLI:** Primero, inicia sesión en tu cuenta de Stripe desde la CLI:
        ```bash
        stripe login
        ```
    -   Ejecuta el siguiente comando en tu terminal para reenviar eventos de Stripe a tu entorno local:
    ```bash
    stripe listen --forward-to localhost:3000/api/stripe/webhook
    ```
    -   La Stripe CLI te proporcionará un `webhook signing secret` (generalmente comienza con `whsec_`). Asegúrate de añadirlo a tu archivo `.env` como `STRIPE_WEBHOOK_SECRET`.
    ```env
    STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
    ```

## Limpieza de Cachés
Si experimentas problemas de compilación o datos desactualizados, puede ser útil limpiar las cachés del proyecto.

1.  **Eliminar cachés de Next.js:**
    ```bash
    rm -rf .next
    ```
2.  **Eliminar módulos de node y caché de npm/yarn (opcional, para una limpieza profunda):**
    ```bash
    rm -rf node_modules
    rm -f package-lock.json yarn.lock
    ```
3.  **Reinstalar dependencias (si eliminaste `node_modules`):**
    ```bash
    npm install # o yarn install
    ```
4.  **Reiniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## Despliegue en Producción

### 1. Prepara las variables de entorno
Asegúrate de tener un archivo `.env` con las siguientes variables configuradas para producción:

```
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=tu_cadena_de_conexion_produccion
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_publishable_key
CLERK_SECRET_KEY=tu_clerk_secret_key
STRIPE_SECRET_KEY=tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=tu_stripe_webhook_secret
NEXT_PUBLIC_BASE_URL=https://tudominio.com
```

- Cambia los valores por los de tu entorno real (Neon, Clerk, Stripe, etc).
- `NEXT_PUBLIC_BASE_URL` debe ser la URL pública de tu app (por ejemplo, `https://animeapi.dev`).

### 2. Configura la base de datos
- Asegúrate de que tu base de datos (por ejemplo, Neon.tech o PostgreSQL en la nube) esté accesible desde el entorno de producción.
- Aplica todas las migraciones:
  ```bash
  npx drizzle-kit push
  ```
- Si necesitas importar datos de anime:
  ```bash
  npm run import-anime
  ```

### 3. Configura Clerk y Stripe
- En Clerk, añade tu dominio de producción en el dashboard de Clerk (para permitir el login desde tu dominio).
- En Stripe, configura los webhooks para que apunten a `https://tudominio.com/api/stripe/webhook`.
- Añade las claves secretas de Clerk y Stripe en las variables de entorno.

### 4. Build de la app para producción
- Ejecuta:
  ```bash
  npm run build
  ```
- Esto generará la carpeta `.next` lista para producción.

### 5. Inicia la app en modo producción
- Ejecuta:
  ```bash
  npm run start
  ```
- Por defecto, Next.js usará el puerto 3000. Puedes cambiarlo con la variable de entorno `PORT`.

### 6. Hosting recomendado
Puedes desplegar la app en:
- **Vercel** (recomendado para Next.js, integración directa, fácil despliegue y variables de entorno desde el dashboard)
- **Railway**, **Render**, **Heroku** o cualquier VPS con Node.js 18+
- Si usas Vercel:
  - Sube el proyecto a GitHub.
  - Conecta el repo en Vercel y configura las variables de entorno en el dashboard.
  - Vercel se encarga del build y el despliegue automático.

### 7. Archivos públicos y SEO
- Asegúrate de que las imágenes importantes (favicon, Open Graph, etc.) estén en la carpeta `public`.
- Revisa que el dominio esté bien configurado en Clerk y Stripe.

### 8. Seguridad y comprobaciones finales
- Usa HTTPS en producción.
- Revisa los logs de la app y de la base de datos.
- Prueba el flujo de registro, login, generación de API key y endpoints protegidos.
- Prueba el webhook de Stripe (puedes usar Stripe CLI para simular eventos).

---

Si tienes dudas sobre el despliegue en un proveedor específico, consulta la documentación oficial de Next.js o pregunta en la comunidad.
