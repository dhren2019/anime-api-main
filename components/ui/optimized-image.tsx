import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { formatImageUrl } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  aspectRatio?: string;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/placeholder-anime.jpg',
  aspectRatio = 'aspect-[3/4]',
  className,
  quality = 90, // Valor predeterminado de alta calidad
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Asegurarse de que las URLs se formatean correctamente
  useEffect(() => {
    if (typeof src === 'string') {
      const formattedSrc = formatImageUrl(src) || fallbackSrc;
      setImgSrc(formattedSrc);
    }
  }, [src, fallbackSrc]);

  return (
    <div className={cn(
      aspectRatio,
      'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
      isLoading ? 'animate-pulse' : '',
      className
    )}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
          </svg>
        </div>
      )}
      
      <Image 
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt}
        onError={() => {
          setImgSrc(fallbackSrc);
          setHasError(true);
          setIsLoading(false);
        }}
        onLoadingComplete={() => setIsLoading(false)}
        style={{ 
          objectFit: 'cover',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          opacity: isLoading ? 0 : 1
        }}
        quality={quality as number}
        {...props}
      />
    </div>
  );
}
