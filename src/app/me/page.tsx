import accountApiRequest from '@/apiRequests/account'
import ProfileForm from '@/app/me/profile-form'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Profile'
}

export default async function MeProfile() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching

  const result = await accountApiRequest.me(sessionToken?.value ?? '')
  return (
    <div className='container mx-auto max-w-md px-4 py-8'>
      <h1 className='text-2xl font-bold text-blue-600'>Edit Profile</h1>
      <ProfileForm profile={result.payload.data} />
    </div>
  )
}
