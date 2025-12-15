import React from 'react'

const AIToggle = ({ enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-10 h-10 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">KudiPAL AI Assistant</h3>
          <p className="text-sm text-gray-600">
            {enabled 
              ? "Active - Get smart suggestions for savings, investments & loans" 
              : "Inactive - Enable for personalized financial insights"}
          </p>
        </div>
      </div>
      
      <button
        onClick={onToggle}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 ${
          enabled ? 'bg-gray-500' : 'bg-gray-300'
        }`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
          enabled ? 'translate-x-8' : 'translate-x-1'
        }`} />
      </button>
    </div>
  )
}

export default AIToggle