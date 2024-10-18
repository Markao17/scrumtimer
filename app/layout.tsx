import './globals.css'
import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import { ThemeProvider } from './components/ThemeProvider'
import Footer from './components/Footer'

const inter = Fira_Code({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scrum Timer Online',
  description: 'A timer app for Scrum meetings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}