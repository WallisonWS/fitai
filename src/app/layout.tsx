import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitCal - Contador de Calorias",
  description: "Conte suas calorias com inteligência artificial. Escaneie alimentos, registre refeições e acompanhe seus macronutrientes.",
  keywords: ["FitCal", "calorias", "nutrição", "macronutrientes", "dieta", "emagrecimento", "saúde", "fitness"],
  authors: [{ name: "FitCal Team" }],
  openGraph: {
    title: "FitCal - Contador de Calorias",
    description: "Conte suas calorias com inteligência artificial",
    url: "https://fitcal.example.com",
    siteName: "FitCal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitCal - Contador de Calorias",
    description: "Conte suas calorias com inteligência artificial",
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'FitCal',
    'mobile-web-app-capable': 'yes',
    'application-name': 'FitCal',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
