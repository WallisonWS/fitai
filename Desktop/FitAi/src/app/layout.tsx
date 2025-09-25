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
  title: "FitAI - Personal Trainer Digital",
  description: "Seu personal trainer e nutricionista digital com IA. Gere planos personalizados de emagrecimento e saúde.",
  keywords: ["FitAI", "fitness", "personal trainer", "nutricionista", "IA", "emagrecimento", "saúde", "treino"],
  authors: [{ name: "FitAI Team" }],
  openGraph: {
    title: "FitAI - Personal Trainer Digital",
    description: "Seu personal trainer e nutricionista digital com IA",
    url: "https://fitai.example.com",
    siteName: "FitAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitAI - Personal Trainer Digital",
    description: "Seu personal trainer e nutricionista digital com IA",
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'FitAI',
    'mobile-web-app-capable': 'yes',
    'application-name': 'FitAI',
    'msapplication-TileColor': '#3b82f6',
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
