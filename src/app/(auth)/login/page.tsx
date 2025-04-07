import LoginForm from '@/app/(auth)/login/login-form'

export default function LoginPage() {
  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold text-center'>Login</h1>
      <div className='flex justify-center'>
        <LoginForm />
      </div>
    </div>
  )
}
