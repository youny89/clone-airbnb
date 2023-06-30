import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from "./components/navbar/Navbar"

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'clone airbnb',
  description: 'clone airbnb using nextjs,mongodb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
