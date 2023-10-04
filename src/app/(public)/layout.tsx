import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import UserContextProvider from '@/contexts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Bucks - Sign In',
  description:
    'Sign In Page of the Next Bucks Application, Developed by João Knisspell - October 2023',
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
          <main>{children}</main>
        </UserContextProvider>
      </body>
    </html>
  )
}
