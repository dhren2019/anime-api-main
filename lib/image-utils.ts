/**
 * Formatea una URL de imagen para asegurar que sea una URL válida
 * y completa, agregando la base URL si es necesario.
 */
export const formatImageUrl = (imageUrl: string | null): string | null => {
    if (!imageUrl) return null;
    
    // Si es una URL de datos base64, la devolvemos tal cual
    if (imageUrl.startsWith('data:image')) {
        return imageUrl;
    }
    
    // Si la URL ya es absoluta (comienza con http:// o https://), la devolvemos tal cual
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        // Verificamos si la URL termina con una extensión de imagen válida
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const endsWithValidExt = validExtensions.some(ext => 
            imageUrl.toLowerCase().endsWith(ext) || imageUrl.toLowerCase().includes(ext + '?')
        );
        
        if (endsWithValidExt) {
            return imageUrl;
        }
        
        // Si no tiene extensión válida, agregamos un parámetro para forzar imagen
        return `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}image=true`;
    }

    // Eliminar cualquier parámetro de URL existente
    const cleanUrl = imageUrl.split('?')[0];

    // Construir la URL base para las imágenes
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Asegurarnos de que la URL comience con /
    const path = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
    
    // Si es una ruta de dragonball-api, usar la ruta completa
    if (path.includes('dragonball-api') || path.startsWith('/public/')) {
        return `${baseUrl}${path}`;
    }
    
    // Por defecto, asumir que es una imagen de la API de DragonBall
    return `${baseUrl}/dragonball-api${path}`;
};
