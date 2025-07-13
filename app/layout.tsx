import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Provider from "./Provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://animeapi.dev"),
  title: "Anime API Platform - La API de Anime para desarrolladores",
  description: "Accede a miles de datos de anime, OVAs y películas con la API más fácil y potente para bots, apps y proyectos otaku. ¡Consigue tu API Key gratis!",
  openGraph: {
    title: "Anime API Platform - La API de Anime para desarrolladores",
    description: "Accede a miles de datos de anime, OVAs y películas con la API más fácil y potente para bots, apps y proyectos otaku. ¡Consigue tu API Key gratis!",
    images: ["/anime-platform.webp"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime API Platform - La API de Anime para desarrolladores",
    description: "Accede a miles de datos de anime, OVAs y películas con la API más fácil y potente para bots, apps y proyectos otaku. ¡Consigue tu API Key gratis!",
    images: ["/anime-platform.webp"]
  },
  icons: {
    icon: {
      url: "/gibli.svg",
      type: "image/svg+xml"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>
            {children}

          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
