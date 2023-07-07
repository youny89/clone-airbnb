import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from "./components/navbar/Navbar"
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'clone airbnb',
  description: 'clone airbnb using nextjs,mongodb',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal/>
          <LoginModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
