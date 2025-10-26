import React from 'react'
import Header from './header'
function Layout({ children }) {
  return (
    <div className='w-full h-screen flex flex-col bg-gray-900 text-white items-center'>
      <Header />
      {children}
    </div>
  )
}

export default Layout