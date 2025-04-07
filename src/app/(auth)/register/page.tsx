'use client'

import RegisterForm from '@/app/(auth)/register/register-form'

const RegisterPage = () => {
  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold text-center'>Sign Up</h1>
      <div className='flex justify-center'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
