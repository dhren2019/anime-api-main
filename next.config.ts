import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitir imágenes de cualquier dominio para máxima compatibilidad
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    // Solo deshabilitar la optimización en desarrollo para depuración
    unoptimized: process.env.NODE_ENV === 'development',
    // Aumentar el límite de tamaño para imágenes más grandes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Configuración para imágenes que no usan fill
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
