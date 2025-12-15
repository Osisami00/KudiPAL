import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BottomNavigation = () => {
  const location = useLocation()
  
  const navItems = [
    { 
      name: 'Overview', 
      path: '/', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'Airtime', 
      path: '/airtime',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Transfer', 
      path: '/transfer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    { 
      name: 'Bills', 
      path: '/bills',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 grid grid-cols-4 md:hidden z-30">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex flex-col items-center justify-center py-3 transition-colors ${
            location.pathname === item.path 
              ? 'bg-red-50 text-blue-600' 
              : 'hover:bg-gray-50 text-gray-600'
          }`}
        >
          <div className={`mb-1 ${location.pathname === item.path ? 'text-red-700' : 'text-gray-500'}`}>
            {item.icon}
          </div>
          <span className={`text-xs font-medium ${
            location.pathname === item.path ? 'text-red-700' : 'text-gray-600'
          }`}>
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default BottomNavigation