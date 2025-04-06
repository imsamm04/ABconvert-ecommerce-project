'use client'
import { useAppContext } from '@/app/app-provider'
import ButtonLogout from '@/components/button-logout'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { user } = useAppContext()
  const { items: cart } = useCartStore()
  const pathname = usePathname()

  const itemCount = cart.reduce((total: number, item: { quantity?: number }) => total + (item.quantity || 1), 0)
  console.log('itemCount', itemCount)

  const isOnABTestSettings = typeof window !== 'undefined' && localStorage.getItem('isOnABTestSettings') === 'true';

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link href='/' className='text-xl font-bold'>
            ABconvert Store
          </Link>
          <div className='flex items-center gap-4'>
            {pathname !== '/ab-test-settings' && (
              <Link href="/ab-test-settings" className="hover:text-primary">
                <Button variant="ghost">Switch to AB Test</Button>
              </Link>
            )}
            <Link href="/cart" className="relative hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
            <ModeToggle />
            {user ? (
              <>
                <Link href={'/me'} className='hover:text-primary'>
                  Hello <strong>{user.name}</strong>
                </Link>
                <ButtonLogout />
              </>
            ) : (
              <>
                <Link href='/login' className='hover:text-primary'>
                  Login
                </Link>
                <Link href='/register' className='hover:text-primary'>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
