import React, { useState } from 'react'
import AIToggle from '../components/AIToggle'

const Settings = () => {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [biometricLogin, setBiometricLogin] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const settingsCategories = [
    {
      title: 'Account Settings',
      items: [
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ), 
          name: 'Personal Information', 
          description: 'Update your personal details' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ), 
          name: 'Security Settings', 
          description: 'Password, PIN, 2FA' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ), 
          name: 'Card Management', 
          description: 'Manage your debit/credit cards' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ), 
          name: 'Contact Preferences', 
          description: 'Email, SMS, push notifications' 
        },
      ]
    },
    {
      title: 'App Preferences',
      items: [
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          ), 
          name: 'Notifications', 
          description: 'Manage alerts and reminders' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          ), 
          name: 'Language', 
          description: 'English (Default)' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ), 
          name: 'Currency', 
          description: 'Naira (₦)' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ), 
          name: 'Display', 
          description: 'Font size, theme' 
        },
      ]
    },
    {
      title: 'Bank Services',
      items: [
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ), 
          name: 'Statements', 
          description: 'View and download statements' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ), 
          name: 'Branch Locator', 
          description: 'Find nearest branches' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          ), 
          name: 'Contact Support', 
          description: '24/7 customer service' 
        },
        { 
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          ), 
          name: 'Rate App', 
          description: 'Share your feedback' 
        },
      ]
    }
  ]

  const aiPreferences = [
    { id: 'savings', name: 'Savings Suggestions', enabled: true },
    { id: 'investments', name: 'Investment Tips', enabled: true },
    { id: 'loans', name: 'Loan Recommendations', enabled: false },
    { id: 'sidehustles', name: 'Side Hustle Ideas', enabled: true },
    { id: 'spending', name: 'Spending Analysis', enabled: true },
    { id: 'budgeting', name: 'Budget Planning', enabled: false },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* AI Assistant Toggle */}
        <div className="mb-6">
          <AIToggle 
            enabled={aiEnabled} 
            onToggle={() => setAiEnabled(!aiEnabled)} 
          />
        </div>

        {/* AI Preferences - Only show if AI is enabled */}
        {aiEnabled && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-bold text-gray-900 mb-4">KudiPAL AI Preferences</h3>
            <p className="text-sm text-gray-600 mb-4">
              Customize what AI suggestions you receive
            </p>
            <div className="space-y-3">
              {aiPreferences.map((pref) => (
                <div key={pref.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{pref.name}</div>
                    <div className="text-xs text-gray-500">
                      {pref.enabled ? 'Active - Receiving suggestions' : 'Inactive - No suggestions'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // In a real app, you would update state here
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pref.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      pref.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition">
                Customize AI Personality
              </button>
            </div>
          </div>
        )}

        {/* Other Settings Toggles */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="font-bold text-gray-900 mb-4">App Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-500">Receive alerts and updates</div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Biometric Login</div>
                <div className="text-sm text-gray-500">Use fingerprint or face ID</div>
              </div>
              <button
                onClick={() => setBiometricLogin(!biometricLogin)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  biometricLogin ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  biometricLogin ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Dark Mode</div>
                <div className="text-sm text-gray-500">Switch to dark theme</div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Settings Categories */}
        {settingsCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-bold text-gray-900 mb-4">{category.title}</h3>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Support & Legal */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="font-bold text-gray-900 mb-4">Support & Legal</h3>
          <div className="space-y-3">
            {['Help Center', 'Privacy Policy', 'Terms of Service', 'About Us', 'Version 2.4.1'].map((item, index) => (
              <button
                key={index}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className={index === 4 ? 'text-gray-500' : 'text-gray-900'}>
                  {item}
                </span>
                {index !== 4 && (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out Button */}
        <button className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:opacity-90 transition mb-20">
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Settings