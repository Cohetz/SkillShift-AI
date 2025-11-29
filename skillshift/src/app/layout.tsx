import './globals.css';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import LogoutButton from '@/components/logout-button';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto p-4 flex items-center gap-4">
            <Link href="/" className="font-heading text-brand text-xl">SkillShift</Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/training">Plano 30</Link>
              <Link href="/simulation">Simulador</Link>
              <Link href="/diagnosis">Diagnóstico</Link>
              <Link href="/gestor">Gestor</Link>
              <Link href="/admin">Admin</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Registrar</Link>
              <Link href="/evolution">Evolução</Link>
              <LogoutButton />
            </nav>
          </div>
        </header>
        <div className="max-w-6xl mx-auto p-4 space-y-6">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
