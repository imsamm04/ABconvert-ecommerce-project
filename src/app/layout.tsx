import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import AppProvider from '@/app/app-provider'
import SlideSession from '@/components/slide-session'
import { baseOpenGraph } from '@/app/shared-metadata'
// import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Footer from '@/components/footer'
// const Header = dynamic(() => import('@/components/header'), { ssr: false })
const inter = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: {
    template: '%s | ABconvert-store',
    default: 'ABconvert-store'
  },
  description: 'ABconvert-store',
  openGraph: baseOpenGraph
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Header />
            {children}
            {/* <Footer /> */}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
