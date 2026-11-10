import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/layout/Navbar"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="bg-[#010103] text-white">
        {/* Sticky navbar — in document flow so every page reserves its space */}
        <div className="sticky top-0 z-30 pt-4 sm:pt-6">
          <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-15">
            <Navbar />
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
