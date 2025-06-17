export const formatImageUrl = (imageUrl: string | null): string | null => {
    if (!imageUrl) return null;
    
    // Si la URL ya es absoluta (comienza con http:// o https://), la devolvemos tal cual
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    // Eliminar cualquier parámetro de URL existente
    const cleanUrl = imageUrl.split('?')[0];

    // Construir la URL base para las imágenes
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Asegurarnos de que la URL comience con /dragonball-api/
    const path = cleanUrl.startsWith('/') ? cleanUrl : `/dragonball-api/${cleanUrl}`;
    
    return `${baseUrl}${path}`;
};
