import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Lora } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import DevSidebar from "@/components/dev/sidebar"
import { Toaster } from "@/components/ui/toaster"

// Font definitions
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Blog CMS - Admin Dashboard",
  description: "Content Management System for your blog",
}

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} font-inter min-h-screen bg-zinc-50 dark:bg-zinc-950`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">
            <DevSidebar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
