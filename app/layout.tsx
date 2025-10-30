"use client";

import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppHeader from "@/components/header/AppHeader";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900">
        <ThemeProvider>
          <SidebarProvider>
            {/* --- Header (fixed at top) --- */}
            <div className="fixed top-0 left-0 right-0 z-50">
              <AppHeader />
            </div>

            {/* --- Sidebar + Main content --- */}
            <div className="flex pt-16 min-h-screen transition-all duration-300">
              <AppSidebar />

              <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}





/*"use client";

import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppHeader from "@/components/header/AppHeader";
import AppSidebar from "@/components/sidebar/AppSidebar";
import { Outfit } from "next/font/google"; // ✅ Import Outfit font
import React from "react";

// ✅ Load the font with Latin subset
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}> {/* ✅ Apply font globally /}
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900">
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              {/* Sidebar /}
              <AppSidebar />

              {/* Main Content Area /}
              <div className="flex flex-col flex-1">
                {/* Header /}
                <AppHeader />

                {/* Page Content /}
                <main className="p-6">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

*/

/*
"use client";

import "./globals.css";
import AppHeader from "@/components/header/AppHeader";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen">
        <ThemeProvider>
          <SidebarProvider>
            {/* Header (top navigation bar) /}
            <AppHeader />

            {/* Main content area /}
            <main className="p-6">{children}</main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

*/





/*main-1// app/layout.tsx
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hedamo Transparency Dashboard',
  description: 'AI-powered product transparency management platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
*/