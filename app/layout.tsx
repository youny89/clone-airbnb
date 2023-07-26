import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from "./components/navbar/Navbar"
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import ClientOnly from './components/ClientOnly'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

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
          <RentModal/>
          <RegisterModal/>
          <LoginModal />
          <SearchModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
