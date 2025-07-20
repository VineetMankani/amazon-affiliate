import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Amazon Deals Hub - Best Deals & Offers",
  description:
    "Discover the top 10 products with amazing deals across all categories. Save money with our curated Amazon affiliate deals.",
  keywords: "Amazon deals, discounts, offers, affiliate, best products, savings",
  authors: [{ name: "Amazon Deals Hub" }],
  openGraph: {
    title: "Amazon Deals Hub - Best Deals & Offers",
    description: "Discover the top 10 products with amazing deals across all categories.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
