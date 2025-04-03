import React from 'react'

const AuthLayout = ({children}  ) => {
  return (
    <div className='flex pt-25 justify-center h-screen'>
        {children}
    </div>
  )
}

export default AuthLayout