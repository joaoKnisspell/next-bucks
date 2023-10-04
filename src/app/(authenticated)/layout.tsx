import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import UserContextProvider from '@/contexts'

// Components
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Bucks - Overview',
  description:
    'Overview Page of the Next Bucks Application, Developed by João Knisspell - October 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <div className="overflow-x-hidden lg:grid lg:grid-cols-app">
            <Sidebar />
            <main className="bg-appSpecialBg2 lg:col-start-2">{children}</main>
          </div>
        </UserContextProvider>
      </body>
    </html>
  )
}
