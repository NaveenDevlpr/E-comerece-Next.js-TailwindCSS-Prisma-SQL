import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Provider from './components/Provider'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fashioned',
  description: 'by Naveen Kumar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
            {children}
        </Provider>
        </body>
    </html>
  )
}
